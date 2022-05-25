// TODO: Install the following package:
import { openDB } from 'idb';

// TODO: Complete the initDb() function below:
const initdb = async () =>
  openDB('contactdb', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('contactdb')) {
        console.log('contactdb database already exists');
        return;
      }
      db.createObjectStore('contactdb', { keyPath: 'id', autoIncrement: true });
      console.log('contactdb database created');
    },
});


// TODO: Complete the postDb() function below:
export const postDb = async (name, home, cell, email)  => {
  const db = await openDB('contactdb', 1);
  const tx = db.transaction('contactdb', 'readwrite');
  const store = tx.objectStore('contactdb');
  const request = store.add({ "name": name, "home_phone": home, "cell_phone": cell, "email": email })  
  const result = await request;
  console.log('🚀 - data saved to the database', result);
  console.log("postDb")
};

// TODO: Complete the getDb() function below:
export const getDb = async () => {
  const db = await openDB('contactdb', 1);
  const tx = db.transaction('contactdb', 'readonly');
  const store = tx.objectStore('contactdb');
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
  return result;
};

// TODO: Complete the deleteDb() function below:
export const deleteDb = async (id) => {
  const db = await openDB('contactdb', 1);
  const tx = db.transaction('contactdb', 'readwrite');
  const store = tx.objectStore('contactdb');
  const request = store.delete(id);
  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();
