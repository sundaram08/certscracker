import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface AnalyticsCardProps {
  username: string;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({ username }) => {
  const [score, setScore] = useState<number>(0);
  const [totalDays, setTotalDays] = useState<number>(0);
  const [rank, setRank] = useState<number>(0);

  useEffect(() => {
    const fetchScore = async () => {
      try {
        const response = await axios.get(`/api/score`, { params: { username } });
        setScore(response.data.score);
      } catch (error) {
        console.error('Error fetching score:', error);
      }
    };

    const fetchTotalDays = async () => {
      try {
        const response = await axios.get(`/api/totalDays`, { params: { username } });
        setTotalDays(response.data.totalDays);
      } catch (error) {
        console.error('Error fetching total days:', error);
      }
    };

    const fetchRank = async () => {
      try {
        const response = await axios.get(`/api/rank`, { params: { username } });
        setRank(response.data.rank);
      } catch (error) {
        console.error('Error fetching rank:', error);
      }
    };

    fetchScore();
    fetchTotalDays();
    fetchRank();
  }, [username]);

  return (
    <div className='flex flex-col items-center justify-center h-full w-full p-4 bg-purple-50'>
      <div className='flex justify-between w-full h-full space-x-4'>
        <div className='border-2 border-purple-500 bg-purple-100 h-full w-1/3 p-4 rounded-lg shadow-lg'>
          <h3 className='text-purple-700 text-lg font-semibold mb-2'>Score</h3>
          <p className='text-purple-900 text-2xl'>{score}</p>
        </div>
        <div className='border-2 border-purple-500 bg-purple-100 h-full w-1/3 p-4 rounded-lg shadow-lg'>
          <h3 className='text-purple-700 text-lg font-semibold mb-2'>Total Days</h3>
          <p className='text-purple-900 text-2xl'>{totalDays}</p>
        </div>
        <div className='border-2 border-purple-500 bg-purple-100 h-full w-1/3 p-4 rounded-lg shadow-lg'>
          <h3 className='text-purple-700 text-lg font-semibold mb-2'>Rank</h3>
          <p className='text-purple-900 text-2xl'>{rank}</p>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsCard;
