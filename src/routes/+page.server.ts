import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
   // redirect the user if logged in
   if (locals.user) {
      redirect(302, '/dashboard');
   }
};