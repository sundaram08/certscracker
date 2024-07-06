import Image from 'next/image'
import React from 'react'
interface AvatarProps {
    src: string;
  }
  

const Avatar:  React.FC<AvatarProps> = ({ src }) => {
  return (
    <div className=''>
      <Image alt='profile' src={src} height={150} width={150} className='rounded-xl'/>
    </div>
  )
}

export default Avatar
