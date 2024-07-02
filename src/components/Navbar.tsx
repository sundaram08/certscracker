import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div>
      <div className='w-screen h-16 flex justify-between items-center border border-purple-200 bg-white'>
        <Link href="/home" className='ml-10 text-3xl'>CertsCracker</Link>
        <button className='mr-10 bg-purple-400 p-2 border shadow-md text-xs rounded-xl text-white'>Logn/signup</button>
      </div>
    </div>
  )
}

export default Navbar
