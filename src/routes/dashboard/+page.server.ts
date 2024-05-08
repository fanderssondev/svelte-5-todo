import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/database';

export const load: PageServerLoad = async ({ locals }) => {
   // redirect user if not logged in
   if (!locals.user) {
      redirect(302, '/login');
   }

   const todos = await db.todo.findMany({
      where: {
         userId: locals.user.id,
      }
   });
   return { todos };
};
