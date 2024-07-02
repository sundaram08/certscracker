import React from 'react';

interface SubjectCardProps {
  imageSrc: string;
  title: string;
}

const SubjectCard: React.FC<SubjectCardProps> = ({ imageSrc, title}) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
      <img className="w-full" src={imageSrc} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
      </div>
    </div>
  );
};

export default SubjectCard;
