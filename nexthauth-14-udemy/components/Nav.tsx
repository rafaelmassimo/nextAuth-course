import React from 'react';
import options from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

const Nav = async () => {
	const session = await getServerSession(options);
	// console.log('session', session); Im commenting out because we add two console.log in the middleware.ts

	return (
		<header className="bg-gray-600 text-gray-100">
			<nav className="flex justify-between items-center w-full px-10 py-4">
				<div>my site</div>
				<div className="flex gap-10">
					<Link href="/">Home</Link>
					{/* Here Im saying, first if we have a session, and the role of the user of this current session is Admin, then we can show the link 
					THIS IS A CHECKING IN THE FRONTEND by using the middleware.ts we can check the role of the user
					...&& means = if the first condition is true then show the rest */}
					{session?.user.role === "Admin" && (<Link href="/CreateUser">Create User</Link>)}

					<Link href="/ClientMember">Client Member</Link>
					<Link href="/Member">Member</Link>
					<Link href="/Public">Public</Link>
					{session ? (
						<>
							<p>{session.user.name}</p>
							<Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
						</>
					) : (
						<Link href="/api/auth/signin">Login</Link>
					)}
				</div>
			</nav>
		</header>
	);
};

export default Nav;
