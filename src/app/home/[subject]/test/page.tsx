'use client';
import { useSearchParams, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import QuestionCard from '@/components/QuestionCard';
import { Divide } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';


interface Option {
  text: string;
  isCorrect: boolean;
}

interface Question {
  _id: string;
  description: string;
  subject: string;
  category: string[];
  options: Option[];
}

const TestPage = () => {
  const pathname = usePathname();
  const subject = pathname.split('/')[2];
  const searchParams = useSearchParams();
  const categories = searchParams.getAll('categories');
  const { data: session } = useSession();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>({});
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!subject || categories.length === 0) return;

    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`/api/questions`, {
          params: {
            subject,
            categories: categories.join(','),
          },
        }); 
        let fetchedQuestions = response.data;


        fetchedQuestions = fetchedQuestions.sort(() => Math.random() - 0.5).slice(0, 10);
        
        setQuestions(fetchedQuestions);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, [subject, JSON.stringify(categories)]);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSelectAnswer = (questionId: string, answer: string) => {
    setSelectedAnswers((prevSelectedAnswers) => ({
      ...prevSelectedAnswers,
      [questionId]: answer,
    }));
  };


  
  const handleFinish = async () => {
    let correctAnswers = 0;
    questions.forEach((question) => {
      const correctOption = question.options.find(option => option.isCorrect);
      if (correctOption && selectedAnswers[question._id] === correctOption.text) {
        correctAnswers += 1;
      }
    });
    setScore(correctAnswers);
    setIsFinished(true);

    // const submissionData = {
    //   marks: correctAnswers,
    //   subject: subject,
    //   categories: categories,
    //   username: session?.user?.name
    // };
    // console.log(submissionData);
    
    try {
      const response = await axios.post('/api/submission',{
        marks: correctAnswers,
        subject: subject,
        categories: categories,
        username: session?.user?.name
      });
      console.log('Submission successful:', response.data);
    } catch (error) {
      console.error('Error submitting test:', error);
    }
  };




  return (
    <div className="mt-16 container mx-auto px-4 flex flex-col justify-center items-center space-y-2">
      <div className='text-left mt-10'>
      <h1 className='text-2xl'>{subject}</h1>
      </div>
      {!isFinished ? (
        <div className=''>
          {questions.length > 0 && (
            <QuestionCard
              question={questions[currentQuestionIndex]}
              currentQuestionIndex={currentQuestionIndex}
              totalQuestions={questions.length}
              selectedAnswer={selectedAnswers[questions[currentQuestionIndex]._id]}
              onSelectAnswer={handleSelectAnswer}
            />
          )}
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrevious}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg disabled:opacity-50"
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              className="bg-purple-500 text-white px-4 py-2 rounded-lg disabled:opacity-50"
              disabled={currentQuestionIndex === questions.length - 1}
            >
              Next
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-50"
              onClick={handleFinish}
              disabled={Object.keys(selectedAnswers).length !== questions.length}
            >
              Finish
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center text-purple-600">
        <h2 className="text-3xl font-semibold mb-4">Your Score</h2>
        
        <p className="text-2xl mb-2">{score} / {questions.length}</p>
        
        <p className="text-lg mb-4">Categories: {categories.join(", ")}</p>
        
        {score < 5 && (
          <p className="text-lg text-red-500">You can do much better!</p>
        )}
        
        {score >= 5 && score <= 8 && (
          <p className="text-lg text-yellow-500">Good Score!</p>
        )}
        
        {score >= 9 && (
          <p className="text-lg text-green-500">Excellent Score!</p>
        )}
      </div>
      

      
      )}
    </div>
  );
};

export default TestPage;