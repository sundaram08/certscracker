import React from 'react';
import Image from 'next/image';

interface SubjectCardProps {
  imageSrc: string;
  title: string;
}

const SubjectCard: React.FC<SubjectCardProps> = ({ imageSrc, title}) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
      <Image className="w-full" src={imageSrc} alt={title} width={400} height={400}/>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
      </div>
    </div>
  );
};

export default SubjectCard;
