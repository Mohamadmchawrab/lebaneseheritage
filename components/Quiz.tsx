"use client";
import { useState, useEffect } from "react";
import StatCard from "./StatCard";

interface QuizProps {
  questions: {
    question: string;
    answers: string[];
    correctAnswer: string;
  }[];
  userId: string | undefined;
}

const Quiz = ({ questions, userId }: QuizProps) => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] =
    useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  const [timeRemaining, setTimeRemaining] = useState(25);
  const [timerRunning, setTimerRunning] = useState(false);

  const { question, answers, correctAnswer } =
    questions[activeQuestion];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timerRunning && timeRemaining > 0) {
      timer = setTimeout(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      handleTimeUp();
    }
    return () => clearTimeout(timer);
  }, [timerRunning, timeRemaining]);

  const startTimer = () => {
    setTimerRunning(true);
  };

  const stopTimer = () => {
    setTimerRunning(false);
  };

  const resetTimer = () => {
    setTimeRemaining(25);
  };

  const handleTimeUp = () => {
    stopTimer();
    resetTimer();
    nextQuestion();
  };

  useEffect(() => {
    startTimer();

    return () => {
      stopTimer();
    };
  }, []);

  const onAnswerSelected = (
    answer: string,
    idx: number
  ) => {
    setChecked(true);
    setSelectedAnswerIndex(idx);
    if (answer === correctAnswer) {
      setSelectedAnswer(answer);
    } else {
      setSelectedAnswer("");
    }
  };

  const nextQuestion = () => {
    setSelectedAnswerIndex(null);
    // Update the results immediately based on whether an answer was selected
    setResults((prev) => {
      const newResults = selectedAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
          };
      return newResults;
    });
  
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setShowResults(true);
      stopTimer();
  
      // Prepare to save results after all questions are answered
      fetch("/api/quizResults", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          quizScore: results.score + (selectedAnswer ? 5 : 0), // Add score based on last question
          correctAnswers: results.correctAnswers + (selectedAnswer ? 1 : 0), // Add correct answer if applicable
          wrongAnswers: results.wrongAnswers,
          totalQuestions: questions.length, // Send total questions to ensure consistency
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not working fam");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Quiz results saved successfully:", data);
        })
        .catch((error) => {
          console.error("Error saving quiz results:", error);
        });
    }
    setChecked(false);
    resetTimer();
    startTimer();
  };
  

  return (
    <div className="min-h-[500px] bg-gray-50 p-5 rounded-lg shadow-md">
      <div className="max-w-[1500px] mx-auto w-[90%] flex justify-center flex-col">
        {!showResults ? (
          <>
            <div className="flex justify-between mb-5 items-center">
              <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-4 rounded-md py-2">
                <h2 className="font-semibold">
                  Question: {activeQuestion + 1}
                  <span>/{questions.length}</span>
                </h2>
              </div>

              <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-4 rounded-md py-2">
                {timeRemaining} seconds to answer
              </div>
            </div>

            <div>
              <h3 className="mb-5 text-xl font-bold text-gray-800">
                {question}
              </h3>
              <ul>
                {answers.map((answer: string, idx: number) => (
                  <li
                    key={idx}
                    onClick={() => onAnswerSelected(answer, idx)}
                    className={`cursor-pointer mb-3 py-2 rounded-md transition duration-200
                      ${selectedAnswerIndex === idx ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white' : 'hover:bg-gray-200'}
                      px-4 text-gray-800 font-medium`}
                  >
                    <span>{answer}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={nextQuestion}
                disabled={!checked}
                className={`mt-4 px-4 py-2 rounded-md font-bold text-white transition duration-300 
                  ${!checked ? 'bg-gray-300' : 'bg-gradient-to-r from-pink-500 to-red-500 hover:scale-105'}`}
              >
                {activeQuestion === questions.length - 1
                  ? "Finish"
                  : "Next Question →"}
              </button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <h3 className="text-2xl font-semibold uppercase mb-10">
              Results 📈
            </h3>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10">
              <StatCard
                title="Percentage"
                value={`${((results.score / (questions.length * 5)) * 100).toFixed(2)}%`}
              />
              <StatCard
                title="Total Questions"
                value={questions.length}
              />
              <StatCard
                title="Total Score"
                value={results.score}
              />
              <StatCard
                title="Correct Answers"
                value={results.correctAnswers}
              />
              <StatCard
                title="Wrong Answers"
                value={results.wrongAnswers}
              />
            </div>
            {/* <button
              onClick={() => window.location.reload()}
              className="mt-10 px-4 py-2 bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold uppercase rounded-md transition duration-300 hover:scale-105"
            >
              Restart Quiz
            </button> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
