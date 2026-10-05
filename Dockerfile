FROM node:22-alpine AS build
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
ARG SITE_URL
ENV SITE_URL=$SITE_URL
RUN pnpm run build:site

FROM nginx:alpine
COPY site/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist-site /usr/share/nginx/html
EXPOSE 80
