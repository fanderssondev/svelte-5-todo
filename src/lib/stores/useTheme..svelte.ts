import { browser } from '$app/environment';

function getInitialTheme(): boolean {
   // Check for a saved theme in local storage
   let savedTheme: string | null = null;

   if (browser) {
      savedTheme = localStorage.getItem('darkMode');

      if (savedTheme) {
         return savedTheme === 'true';
      } else {
         // If no saved theme, check the system preference
         const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
         return prefersDark;
      }
   }
   return false;
}

// 1. Check system preference
// 2. Check local storage
// 3. 


export function useTheme() {

   let darkMode = $state<boolean>(getInitialTheme());


   // Optional: Listen to system preference changes
   if (browser) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
         darkMode = event.matches;

         if (browser) {
            if (darkMode) {
               // document.body.dataset.theme = 'dark';
               localStorage.setItem('darkMode', 'true');
            } else {
               // document.body.dataset.theme = '';
               localStorage.setItem('darkMode', 'false');
            }
         }
      });
   }

   if (browser) {
      if (darkMode) {
         // document.body.dataset.theme = 'dark';
         localStorage.setItem('darkMode', 'true');
      } else {
         // document.body.dataset.theme = '';
         localStorage.setItem('darkMode', 'false');
      }
   }

   function toggleDarkmode() {
      darkMode = !darkMode;

      if (browser) {
         if (darkMode) {
            // document.body.dataset.theme = 'dark';
            localStorage.setItem('darkMode', 'true');
         } else {
            // document.body.dataset.theme = '';
            localStorage.setItem('darkMode', 'false');
         }

         // darkMode ? (document.body.dataset.theme = 'dark') : (document.body.dataset.theme = '');
         // darkMode ? localStorage.setItem('darkMode', 'true') : localStorage.setItem('darkMode', 'false');
      }
   }

   return {
      get darkMode() { return darkMode; },
      toggleDarkmode
   };
}

