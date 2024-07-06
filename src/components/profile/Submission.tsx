import React, { useState, useEffect } from 'react';
import { ITest } from '@/models/testModel';
import axios from 'axios';
import SubmissionCard from './SubmissionCard';

interface SubmissionProps {
  username: string;
}

const Submission: React.FC<SubmissionProps> = ({ username }) => {
  const [submissions, setSubmissions] = useState<ITest[] | null>([]);

  useEffect(() => {
    if (!username) return;

    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`/api/submission`, {
          params: {
            username,
          },
        });
        setSubmissions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, [username]);

  return (
    <div>
         {submissions && submissions.map((submission) => (
        <SubmissionCard key={submission.id} submission={submission} />
      ))}
    </div>
  );
}

export default Submission;
