import { CheckCircle, XCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Result = ({ testResult }: { testResult: any }) => {
  console.log(testResult);

  const { totalQuestions, correctAnswers, percentage, details } = testResult;
  const wrongAnswers = totalQuestions - correctAnswers;

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-2">Quiz Summary</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-gray-500">Total Questions</p>
            <p className="text-lg font-bold">{totalQuestions}</p>
          </div>
          <div className="text-center text-green-600">
            <p>Correct</p>
            <p className="text-lg font-bold">{correctAnswers}</p>
          </div>
          <div className="text-center text-red-600">
            <p>Wrong</p>
            <p className="text-lg font-bold">{wrongAnswers}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-500">Percentage</p>
            <p className="text-lg font-bold">{percentage}%</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h1 className="font-semibold">Your Answers:</h1>
        {details.map((item: any, index: number) => {
          const isCorrect = item.correct;
          return (
            <div
              key={index}
              className={`p-4 rounded-lg shadow flex items-start gap-3 ${
                isCorrect ? "bg-green-100" : "bg-red-100"
              }`}
            >
              {isCorrect ? (
                <CheckCircle className="text-green-600 w-6 h-6 mt-1" />
              ) : (
                <XCircle className="text-red-600 w-6 h-6 mt-1" />
              )}
              <div>
                <p className="font-semibold">{item.questionText}</p>
                <p className="text-gray-700">
                  {item.selectedOptionText || "No answer"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <Link to="/overview">
        {" "}
        <button className="bg-primary mt-3 py-2 px-6 rounded-lg text-white">
          Back Home
        </button>
      </Link>
    </div>
  );
};

export default Result;
