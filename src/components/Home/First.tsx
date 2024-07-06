import React from 'react'
import Image from 'next/image'
import cover from '@/../public/cover.svg'

const First = () => {
  return (
    <div>
      <div className='h-110 w-screen  flex'>
            <div className='w-1/2  flex flex-col justify-center'>
                <h1 className='text-xl md:text-4xl m-4 ml-8 '>Stay Ahead Of The Curve With Our EASY Test</h1>
                <p className=' ml-8 mt-6'>Skills is your one-stop-shop for upscaling. Get maximum value for timeand resources you invest, with job-ready courses & high-technology,available at the lowest cost.</p>
                <button className='text-xl m-4 ml-48 bg-purple-400 w-28 text-white'>Resources</button>
            </div>
            <div className='w-1/2 flex justify-center items-center'>
                <Image src={cover} height={400} width={400} alt="" />
            </div>
      </div>
    </div>
  )
}

export default First
