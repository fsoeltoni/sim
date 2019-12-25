import { storage } from "./attrs";

const setStorage = item => localStorage.setItem(storage, JSON.stringify(item));

const getStorage = () => JSON.parse(localStorage.getItem(storage));

const clearStorage = () => localStorage.removeItem(storage);

export default {
  set: setStorage,
  get: getStorage,
  clear: clearStorage
};
