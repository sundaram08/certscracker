import React from 'react';
import { ITest } from '@/models/testModel';

interface SubmissionCardProps {
  submission: ITest;
}

const SubmissionCard: React.FC<SubmissionCardProps> = ({ submission }) => {
  return (
    <div className="border border-purple-300 bg-purple-50 rounded-lg shadow-lg p-4 m-4">
      <h3 className="text-xl font-bold text-purple-700 mb-2">{submission.subject}</h3>
      <p className="text-lg text-purple-600 mb-4">Marks: {submission.marks}</p>

      <div className="mt-2 md:flex">
        <h4 className="text-md font-semibold text-purple-700">Categories:</h4>
        <ul className="pl-5 mt-1 md:flex space-x-3">
          {submission.categories.map((cat, index) => (
            <li key={index} className="text-sm text-purple-600">{cat}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SubmissionCard;
