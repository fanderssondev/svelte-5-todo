// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
   namespace App {
      // interface Error {}
      interface Locals {
         user: {
            id: string,
            name: string,
         };
      }
      // interface PageData {}
      // interface PageState {}
      // interface Platform {}
   }
   // interface Todo {
   //    text: string,
   //    completed: boolean;
   //    userId: string,
   //    editing: boolean;
   // }
}

export {};
