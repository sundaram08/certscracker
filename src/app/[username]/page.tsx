'use client'
import Avatar from '@/components/profile/Avatar'
import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { useParams } from 'next/navigation';
import Submission from '@/components/profile/Submission';



interface User {
    username: string;
    name: string;
    email: string;
    // avatarUrl: string;
    // Add more fields as needed
  }

const Page = () => {
    const [user, setUser] = useState<User | null>(null);
    const { username } = useParams();
    

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`/api/users/${username}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [username]);

  return (
    <div className='flex mt-16'>
        <div className='w-[25%] border max-h-[92.5dvh] border-gray-600 flex flex-col bg-[#7663E9] rounded-r-2xl'>
            <div className='h-80 flex justify-center items-center'><Avatar src={"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}/></div>
            <div className='text-center text-white mt-4'>
          {user ? (
            <div className='space-y-2'>
              <h1 className='text-2xl'>{user.username}</h1>
              <p className='text-sm'>{user.email}</p>
            </div>
          ) : (
            <p>User does not exist</p>
          )}
        </div>
        </div>
        <div className='w-[75%] h-[calc(100vh-4rem)] flex flex-col'>
        <div className='h-40 border border-r-8 flex-shrink-0'></div>
        <div className='h-48 border border-r-8 flex-shrink-0'></div>
        <div className='flex-grow overflow-y-auto'>
          <Submission username={`${username}`} />
        </div>
      </div>
    </div>
  )
}

export default Page
