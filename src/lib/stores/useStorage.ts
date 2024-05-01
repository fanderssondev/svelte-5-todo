import { writable, type Writable } from 'svelte/store';

/**
 * A custom hook that provides a writable Svelte store with local storage persistence.
 *
 * @param key - The key to use for storing the value in local storage.
 * @param initialValue - The initial value for the store.
 * @returns A writable Svelte store with local storage persistence.
 */
export const useStorage = <T>(key: string, initialValue: T): Writable<T> => {
   const serialize = JSON.stringify;
   const deserialize = JSON.parse;

   const safeLocalStorage = {
      getItem: (key: string) => {
         if (typeof window !== 'undefined') {
            return localStorage.getItem(key);
         }
         return null;
      },
      setItem: (key: string, value: string) => {
         if (typeof window !== 'undefined') {
            localStorage.setItem(key, value);
         }
      }
   };

   let storedValue: T;
   const stored = safeLocalStorage.getItem(key);
   if (stored) {
      storedValue = deserialize(stored);
   } else {
      storedValue = initialValue;
   }

   let store = writable(storedValue);
   store.subscribe((value) => safeLocalStorage.setItem(key, serialize(value)));

   return store;
};