// components/Navbar.js
import Link from 'next/link';
import React from 'react';
import { useSession, signOut } from 'next-auth/react';

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <div className='w-screen h-16 flex justify-between items-center border border-purple-200 bg-white'>
      <Link href="/home" className='ml-10 text-3xl text-black'>
        CertsCracker
      </Link>
      {session ? (
        <div className='flex items-center mr-10'>
          <Link href={`/${session.user?.name}`}><span className='mr-4 text-xs'>{session.user?.name}</span></Link>
          <button
            onClick={() => signOut()}
            className='bg-purple-400 p-2 border shadow-md text-xs rounded-xl text-white'
          >
            Sign Out
          </button>
        </div>
      ) : (
        <Link href="/login">
          <button className='mr-10 bg-purple-400 p-2 border shadow-md text-xs rounded-xl text-white'>
            Login/Signup
          </button>
        </Link>
      )}
    </div>
  );
};

export default Navbar;
