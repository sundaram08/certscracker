'use client'
import React, { useState,useEffect } from 'react'
import { auth } from "@/auth";
import SubjectCard from '@/components/SubjectCard';
import First from '@/components/Home/First';
import { ISubject } from '@/models/subjectModel';
import axios from 'axios';
import Link from 'next/link';


const Page =  () => {
  //   const session = await auth();
  // console.log(session);

  // if (!session) {
  //   return <p>Please Log In</p>;
  // }


  const [subjects,setSubjects] =useState<ISubject[]>([]);
  useEffect(()=>{
    const fetchdata = async ()=>{ 
      try{
        const response = await axios.get('/api/subjects');
        setSubjects(response.data);
      }  
      catch (error) {
        console.error('Error fetching data:', error);
      } 
  }
  fetchdata();
  },[])


  return (
    <>
      <div className='flex flex-col'>
        <First/>
        <div className="grid grid-cols-2 md:grid-cols-4">
        {subjects.length > 0 ?(subjects?.map((subject, index) => (
         <Link href={`/home/${subject.name}`} key={subject._id.toString()}>
         
           <SubjectCard
             imageSrc={subject.image}
             title={subject.name}
           />
      
       </Link>
        ))): (
          <p>No subjects available.</p>
        )}
        </div>
      </div>
    </>
  )
}

export default Page
