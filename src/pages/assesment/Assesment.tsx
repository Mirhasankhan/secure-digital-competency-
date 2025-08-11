import { useState } from "react";
import {
  useGetQuestionsQuery,
  useQuizResultMutation,
} from "../../redux/features/auth/authApi";
import Result from "../../components/Result";
import { toast } from "react-toastify";

const Assesment = () => {
  const [active, setActive] = useState("assesment");
  const [testResult, setTestResult] = useState({});
const { data: questionData, isLoading } = useGetQuestionsQuery("", {
  refetchOnMountOrArgChange: true,
});
 
  const [quizResult, { isLoading: isQuizLoading }] = useQuizResultMutation();
  const questions = questionData?.data || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<
    { questionId: string; selectedOptionId: string }[]
  >([]);

  const currentQuestion = questions[currentIndex] || null;
  const progress =
    questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0;

  const handleOptionSelect = (optionId: string) => {
    if (!currentQuestion) return;

    setUserAnswers((prev) => {
      const filtered = prev.filter(
        (ans) => ans.questionId !== currentQuestion._id
      );
      return [
        ...filtered,
        { questionId: currentQuestion._id, selectedOptionId: optionId },
      ];
    });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      console.log(userAnswers);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };
  const handleSubmit = async () => {
    const payload = { userAnswers };
    const response = await quizResult(payload);
    if (response.data) {
      setTestResult(response.data?.data);
      setActive("result");
      toast.success("Quiz submitted successfully");
      localStorage.setItem("token", response?.data?.data?.accessToken)
    }
  };

  if (isLoading) {
    return <p>Loading questions...</p>;
  }

  if (!questions.length) {
    return <p>No questions found.</p>;
  }

  return (
    <div className="flex flex-col items-center">
      {active == "assesment" ? (
        <div style={{ maxWidth: "500px", minWidth:"430px", margin: "auto", marginTop: "150px", marginRight:"6px", marginLeft:"6px" }}>
          <div
            style={{
              background: "#ddd",
              borderRadius: "4px",
              height: "10px",
              marginBottom: "15px",
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                background: "#4caf50",
                height: "100%",
                borderRadius: "4px",
                transition: "width 0.3s ease",
              }}
            />
          </div>
          <h3>
            Question {currentIndex + 1} of {questions.length}
          </h3>
          <p className="pb-6">{currentQuestion.text}</p>
          {currentQuestion.options.map((option: any) => {
            const selected = userAnswers.find(
              (ans) =>
                ans.questionId === currentQuestion._id &&
                ans.selectedOptionId === option._id
            );

            return (
              <button
                key={option._id}
                style={{
                  display: "block",
                  marginBottom: "8px",
                  padding: "8px",
                  fontWeight: "700",
                  width: "100%",
                  background: selected ? "lightgreen" : "white",
                  border: "1px solid #ccc",
                  cursor: "pointer",
                  borderRadius: "8px",
                }}
                onClick={() => handleOptionSelect(option._id)}
              >
                {option.text}
              </button>
            );
          })}

          <div style={{ marginTop: "20px", display: "flex", gap: "40px" }}>
            <button
              onClick={handleBack}
              disabled={currentIndex === 0}
              style={{ flex: 1 }}
              className="text-primary px-4 py-1 border border-primary rounded-lg"
            >
              Back
            </button>
            {currentIndex === questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                style={{ flex: 1 }}
                disabled={
                  !userAnswers.find(
                    (ans) => ans.questionId === currentQuestion._id
                  )
                }
                className="bg-primary text-white px-4 py-1 border border-primary rounded-lg"
              >
                {isQuizLoading ? "Submitting...." : "Submit"}
              </button>
            ) : (
              <button
                onClick={handleNext}
                style={{ flex: 1 }}
                disabled={
                  !userAnswers.find(
                    (ans) => ans.questionId === currentQuestion._id
                  )
                }
                className="bg-primary text-white px-4 py-1 border border-primary rounded-lg"
              >
                Next
              </button>
            )}
          </div>
        </div>
      ) : (
        <Result testResult={testResult}></Result>
      )}
    </div>
  );
};

export default Assesment;
