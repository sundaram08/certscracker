import React from 'react';

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

interface QuestionCardProps {
  question: Question;
  currentQuestionIndex: number;
  totalQuestions: number;
  selectedAnswer: string;
  onSelectAnswer: (questionId: string, answer: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, currentQuestionIndex, totalQuestions, selectedAnswer,
  onSelectAnswer, }) => {
  return (
    <div className="bg-purple-50 shadow-md rounded-lg p-8 my-4">
      <div className="mb-4 text-xl font-semibold">
        Question {currentQuestionIndex + 1}/{totalQuestions}
      </div>
      <div className="mb-6">
        <h2 className="text-lg font-medium">{question.description}</h2>
      </div>
      <div className="space-y-4">
        {question.options.map((option, index) => (
          <div key={index} className="flex items-center">
            <input type="radio" id={`option-${index}`} name={`question-${question._id}`} checked={selectedAnswer === option.text}
                onChange={() => onSelectAnswer(question._id, option.text)} className="mr-2" />
            <label htmlFor={`option-${index}`} className="text-lg">{option.text}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
