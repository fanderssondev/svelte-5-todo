// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
   namespace App {
      // interface Error {}
      // interface Locals {}
      // interface PageData {}
      // interface PageState {}
      // interface Platform {}
   }
   interface Todo {
      id: string,
      text: string,
      completed: boolean;
      editing: boolean;
   }
}

export {};
