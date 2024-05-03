import { writable } from 'svelte/store';

/**
 * Function to get the initial theme
 * 
 * @returns {boolean} - The initial theme value
 */
function getInitialTheme() {
   // Check for a saved theme in local storage
   const savedTheme = localStorage.getItem('darkMode');
   if (savedTheme) {
      return savedTheme === 'true';
   } else {
      // If no saved theme, check the system preference
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark;
   }
}

// Create a writable store with the initial theme
export const darkMode = writable(getInitialTheme());

// Subscribe to changes in the store to update local storage
darkMode.subscribe(value => {
   localStorage.setItem('darkMode', value.toString());
});

// Optional: Listen to system preference changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
   darkMode.set(event.matches);
});

