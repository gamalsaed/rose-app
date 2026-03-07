'use server';
import { decode } from 'next-auth/jwt';
import { cookies } from 'next/headers';

export default async function getMyToken() {
  const decodedToken = (await cookies()).get('next-auth.session-token')?.value;
  const token = await decode({
    token: decodedToken,
    secret: process.env.NEXTAUTH_SECRET!,
  });
  return token?.token;
}
// export const getApiHeaders = async (request?: NextRequest) => {
//   let nextRequest = request;

//   if (!request) {
//     // getToken() reads req.cookies. NextRequest built from next/headers ReadonlyHeaders
//     // may not expose cookies correctly. Copy into a plain Headers so NextRequest
//     // parses Cookie and getToken() can read the session.
//     const headersList = headers();
//     const newHeaders = new Headers();
//     headersList.forEach((value, key) => newHeaders.set(key, value));
//     nextRequest = new NextRequest(BASE_API, { headers: newHeaders });
//   }

//   const token = await getToken({
//     req: nextRequest as NextRequest,
//     secret: process.env.NEXTAUTH_SECRET,
//   });

//   return {
//     'Content-Type': 'application/json',
//     ...(token?.token ? { Authorization: `Bearer ${token.token}` } : {}),
//   };
// };