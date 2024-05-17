import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/database';

export const load: PageServerLoad = async ({ locals }) => {
   // redirect user if not logged in
   if (!locals.user) {
      redirect(307, '/login');
   }

   const todos: Todos_DB[] = await db.todo.findMany({
      where: {
         userId: locals.user.id,
      }
   });
   return { todos };
};

export const actions: Actions = {
   create: async ({ request, locals }) => {
      const data = await request.formData();

      await db.todo.create({
         data: {
            text: data.get('text') as string,
            completed: false,
            userId: locals.user.id
         }
      });
   },
   update: async ({ request, locals }) => {
      const data = await request.formData();
      const id = data.get('id') as string;
      const text = data.get('text') as string;

      await db.todo.update({
         where: { id, userId: locals.user.id },
         data: {
            text,
            completed: false
         }
      });
   },
   toggleCompleted: async ({ request, locals }) => {
      const data = await request.formData();
      const id = data.get('id') as string;
      const completed = data.get('completed');

      const isCompleted: boolean = completed === 'true' ? true : false;

      const response = await db.todo.update({
         where: { id, userId: locals.user.id },
         data: {
            completed: isCompleted
         }
      });
   },
   delete: async ({ request, locals }) => {
      const data = await request.formData();
      const id = data.get('id') as string;

      const response = await db.todo.delete({
         where: { id, userId: locals.user.id }
      });
   }
};