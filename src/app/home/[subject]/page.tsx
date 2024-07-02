'use client'
import React,{useState,useEffect} from 'react'
import axios from 'axios'
import CategoryCard from '@/components/Category';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { MoveRight } from 'lucide-react';
import { CircleCheckBig } from 'lucide-react';

const Page = () => {
    const router = useRouter();
    const [categories,setCategories] =useState<string[]>([]);
    const[allSelect,setAllSelect] = useState<any>(false)
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const path = usePathname();
    const subject = path.split('/').pop();
    
    const toggleCategory = (name: string) => {
      setSelectedCategories((prevSelected) =>
        prevSelected.includes(name)
          ? prevSelected.filter((category) => category !== name)
          : [...prevSelected, name]
      );
    };
  
  
  
    useEffect(()=>{
      const fetchdata = async ()=>{ 
        try{
          const response = await axios.get(`/api/subjects/${subject}`);
          setCategories(response.data.categories);
        }  
        catch (error) {
          console.error('Error fetching data:', error);
        } 
    }
    fetchdata();
    },[])

    const toggleSelectAll = () => {
      if (allSelect) {
        setSelectedCategories([]);
      } else {
        setSelectedCategories(categories);
      }
      setAllSelect(!allSelect);
    };
    const handleEnterTest = () => {
      const query = selectedCategories.map(category => `categories=${category}`).join('&');
      const url = `/home/${subject}/test?${query}`;
      router.push(url);
    };
    
  return (
    <>
      <div className='flex flex-col mt-20 space-y-8'>
        <div className='ml-12 w-[85%] flex justify-between'>
            <h1 className='text-xl text-left mt-10 flex'>Tap to select categories<MoveRight className='mt-1 ml-1' strokeWidth={1.3}/></h1>
            <button className={`flex text-right mt-10 space-x-2 border p-1 rounded-lg ${allSelect? 'border bg-purple-300' : ''}`}  onClick={toggleSelectAll}>Select all  <CircleCheckBig className='ml-1'/> </button>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-4 w-[80%] ml-28">
        {categories?.map((category, index) => (
          <CategoryCard
            key={index}
            name={category}
            isSelected={selectedCategories.includes(category)}
            toggleSelected={() => toggleCategory(category)}
          />
        ))}
        </div>
        <div className='ml-[75%] max-w-40'>
        <button onClick={handleEnterTest} disabled={!selectedCategories.length} className='border bg-purple-300 p-3 rounded-2xl text-xl w-32 hover:bg-purple-400'>
            Start
          </button>
        </div>
      </div>
    </>
  )
}

export default Page
