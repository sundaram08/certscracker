import React,{useState} from 'react';

interface CategoryCardProps {
  name:string,
  isSelected: boolean;
  toggleSelected: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, isSelected, toggleSelected }) => {
  const [selected, setSelected] = useState<any>(false);
  return (
    <div
      className={`rounded-lg overflow-hidden border border-l-8 m-4 ${isSelected ? 'border border-purple-300' : ''}`}
      onClick={toggleSelected}
    >
      <div className="relative">
        <div className="px-4 py-2">
          <div className="font-base text-lg">{name}</div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;