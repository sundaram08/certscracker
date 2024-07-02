'use client';
import { useSearchParams, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import QuestionCard from '@/components/QuestionCard';
import { Divide } from 'lucide-react';

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
        setQuestions(response.data);
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

  const handleFinish = () => {
    let correctAnswers = 0;
    questions.forEach((question) => {
      const correctOption = question.options.find(option => option.isCorrect);
      if (correctOption && selectedAnswers[question._id] === correctOption.text) {
        correctAnswers += 1;
      }
    });
    setScore(correctAnswers);
    setIsFinished(true);
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
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              onClick={handleFinish}
            >
              Finish
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl">Your Score</h2>
          <p className="text-lg">{score} / {questions.length}</p>
          <p>{categories}</p>
        </div>
      )}
    </div>
  );
};

export default TestPage;