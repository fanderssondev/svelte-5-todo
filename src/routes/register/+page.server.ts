import { fail, redirect } from '@sveltejs/kit';
import type { Action, Actions, PageServerLoad } from './$types';
import bcrypt from 'bcrypt';

import { db } from '$lib/database';

export const load: PageServerLoad = async ({ locals }) => {
   // redirect the user if logged in
   if (locals.user) {
      redirect(302, '/dashboard');
   }
};

const register: Action = async ({ request }) => {
   const data = await request.formData();
   const username = data.get('username');
   const password = data.get('password');

   // Validate data
   if (
      typeof username !== 'string' ||
      typeof password !== 'string' ||
      !username || !password
   ) {
      return fail(400, { invalid: true });
   }

   const user = await db.user.findUnique({
      where: { username }
   });

   // Check if the user already exists
   if (user) {
      return fail(400, { user: true });
   }

   await db.user.create({
      data: {
         username,
         passwordHash: await bcrypt.hash(password, 10),
         userAuthToken: crypto.randomUUID()
      }
   });

   redirect(303, '/login');
};

export const actions: Actions = { register };