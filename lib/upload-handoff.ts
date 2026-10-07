// Passes one picked photo from the static sticker page to the editor page.
const STORE = "files";
const KEY = "pending";

function run<T>(action: (store: IDBObjectStore) => IDBRequest<T>) {
  return new Promise<T>((resolve, reject) => {
    const request = indexedDB.open("94tools-upload", 1);
    request.onupgradeneeded = () => request.result.createObjectStore(STORE);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const database = request.result;
      const transaction = database.transaction(STORE, "readwrite");
      const result = action(transaction.objectStore(STORE));
      transaction.oncomplete = () => {
        database.close();
        resolve(result.result);
      };
      transaction.onerror = transaction.onabort = () => {
        database.close();
        reject(transaction.error);
      };
    };
  });
}

export const saveUpload = (file: File) => run((store) => store.put(file, KEY));

export const takeUpload = () =>
  run<File | undefined>((store) => {
    const request = store.get(KEY);
    store.delete(KEY);
    return request;
  });
