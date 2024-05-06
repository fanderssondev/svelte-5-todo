import { browser } from '$app/environment';
import { writable } from 'svelte/store';

function getInitialTheme(): boolean {
   // Check for a saved theme in local storage
   const savedTheme: string | null = null;
   if (browser) {
      const savedTheme = localStorage.getItem('darkMode');
   }
   if (savedTheme) {
      return savedTheme === 'true';
   } else {
      // If no saved theme, check the system preference

      if (browser) {
         const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
         return prefersDark;
      }

   }
   return false;
}



export function useTheme() {

   let darkMode = $state<boolean>(getInitialTheme());

   // Optional: Listen to system preference changes
   if (browser) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
         console.log(event.matches);
         darkMode = event.matches;

         darkMode ? (document.body.dataset.theme = 'dark') : (document.body.dataset.theme = '');
         darkMode ? localStorage.setItem('darkMode', 'true') : localStorage.setItem('darkMode', 'false');
      });
   }

   function toggleDarkmode() {
      darkMode = !darkMode;

      if (browser) {
         darkMode ? (document.body.dataset.theme = 'dark') : (document.body.dataset.theme = '');
         darkMode ? localStorage.setItem('darkMode', 'true') : localStorage.setItem('darkMode', 'false');
      }
   }

   return {
      get darkMode() { return darkMode; },
      toggleDarkmode
   };
}

