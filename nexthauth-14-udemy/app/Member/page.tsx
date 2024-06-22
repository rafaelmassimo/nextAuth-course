
//>>THIS IS A SERVER SIDE PAGE IF YOU TRY TO ADD 'USE CLIENT YOU ARE GOING TO HAVE AN ERROR'

import { getServerSession } from 'next-auth'
import React from 'react'
import options from '@/app/api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation'

getServerSession(options)

const Member = async () => {
  const session = await getServerSession(options);

  //Here you can protect the page by checking if the session is not available!!
  //Here you can protect the server side pages
  if(!session) {
    redirect('/api/auth/signin?callbackUrl=/Member')
  }
  return (
    <div>
      <h1>Member Server Page</h1>
      <p>{session.user.email}</p>
      <p>{session.user.role}</p>
    </div>
  )
}

export default Member
