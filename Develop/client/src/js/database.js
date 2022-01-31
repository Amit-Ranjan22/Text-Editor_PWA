import { openDB } from 'idb';

const initdb = async () =>
  openDB("edits", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("edits")) {
        console.log("edits database already exists");
        return;
      }
      db.createObjectStore("edits", { keyPath: "id", autoIncrement: true });
      console.log("edits database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const editsDb = await openDB("edits", 1);

  const tx = editsDb.transaction("edits", "readwrite");

  const store = tx.objectStore("edits");

  const request = store.put({ id: 1, value: content });

  const result = await request;

  result
    ? console.log("🚀 - Data saved to the database", result.value)
    : console.error("putDb not implemented");
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const editsDb = await openDB("edits", 1);
  const tx = editsDb.transaction("edits", "readonly");

  result
    ? console.log("Data retrieved", result.value)
    : console.log("No data found");

  return result.value;
};

initdb();
