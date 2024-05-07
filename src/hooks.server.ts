import { db } from '$lib/database';
import type { Handle } from '@sveltejs/kit';


export const handle: Handle = async ({ event, resolve }) => {
   // get cookie from user
   const session = event.cookies.get('session');

   if (!session) {
      // if no session load page as normal
      return await resolve(event);
   }

   // find user based on 'session'
   const user = await db.user.findUnique({
      where: { userAuthToken: session },
      select: { username: true },
   });

   // if user exists set `event.locals`
   if (user) {
      event.locals.user = {
         name: user.username,
      };
   }

   // load page
   return await resolve(event);
}

