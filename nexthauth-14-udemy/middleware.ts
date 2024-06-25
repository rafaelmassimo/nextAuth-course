//If you leave the code with just this line above all the pages is going to be protected
// export {default} from "next-auth/middleware"

import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(function middleware(req) {
	console.log(req.nextUrl.pathname); //This is for check the path of the page
	console.log(req.nextauth?.token?.role);// This is for check the role of the user that we added on the options.ts
    
    //Here I'm saying if the user is trying to access a path which start with /CreateUser and its role is not Admin (note that google login is going to be Google user and 
    //github is going to be Admin role because I set it op on the options.ts file) then it's going to be redirected to the Denied page (you need to create it first)
    if(req.nextUrl.pathname.startsWith("/CreateUser") && req.nextauth?.token?.role !== "ADMIN"){
        return NextResponse.rewrite(new URL ("/Denied", req.url))
    }
    
});
//But here you can decide which pages you want to protect
export const config = { matcher: ['/CreateUser'] };

//>> Now check the navbar component and the link to create an user you can see more verification