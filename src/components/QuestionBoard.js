import { useState, useEffect, useRef } from "react";
import { STATE } from "../views/App";
import MultiChoice from "./MultiChoice";
import TrueFalse from "./TrueFalse";
import ErrorPage from "./ErrorPage";

export const parseEntities = (txt) =>
  new DOMParser().parseFromString(txt, "text/html").body.innerText;

const QuestionBoard = ({
  questions,
  setState,
  score,
  updateScorePercentage,
}) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [answerList, updateAnswerList] = useState([]);
  const ref = useRef();
  const handleNext = () =>
    questionIndex === questions.length - 1
      ? setState(STATE.FINISHED)
      : (setSubmitted(false),
        setCurrentAnswer(""),
        setQuestionIndex(questionIndex + 1));
  const question = questions ? questions[questionIndex] : "";
  useEffect(() => {
    if (questions) {
      if (submitted === false) {
        let temp = [...question.incorrect_answers, question.correct_answer];
        //fisher yates method of shuffling --
        //https://stackoverflow.com/questions/64925666/how-can-i-sort-an-array-randomly-in-javascript
        for (let i = temp.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * i);
          let k = temp[i];
          temp[i] = temp[j];
          temp[j] = k;
        }
        updateAnswerList(
          temp,
          question.incorrect_answers,
          question.correct_answer
        );
      } else {
        ref.current.focus();
      }
    }
  }, [
    submitted,
    question.incorrect_answers,
    question.correct_answer,
    questions,
  ]);
  const handleSubmit = () => {
    setSubmitted(true);
    if (currentAnswer === question.correct_answer) {
      updateScorePercentage(score + 1);
    }
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    submitted ? handleNext() : handleSubmit();
  };
  return !questions.length ? (
    <ErrorPage state={STATE.LOADING_SUCCESS} setState={setState} />
  ) : (
    <div className="row mx-4 mt-2 justify-content-center">
      <div className="row justify-content-between">
        <div
          className={
            "col-sm-auto ms-md-5 my-2 py-2 text-center rounded-pill " +
            (question.difficulty === "medium"
              ? "bg-warning"
              : question.difficulty === "easy"
              ? "bg-success"
              : "bg-danger")
          }
        >
          Difficulty: {question.difficulty}
        </div>
        <div className="col-sm-auto me-md-5 my-2 py-2 text-center rounded-pill text-light bg-quiz-blue">
          Category: {question.category}
        </div>
      </div>
      <div className="row text-center mb-4 mt-3">
        <p className="lead fs-2">{parseEntities(question.question)}</p>
      </div>
      <form action="#" onSubmit={(e) => handleOnSubmit(e)}>
        {question.type === "boolean" ? (
          <TrueFalse
            question={question}
            index={questionIndex}
            submitted={submitted}
            currentAnswer={currentAnswer}
            setCurrentAnswer={setCurrentAnswer}
          />
        ) : (
          <MultiChoice
            question={question}
            answers={answerList}
            submitted={submitted}
            currentAnswer={currentAnswer}
            setCurrentAnswer={setCurrentAnswer}
          />
        )}
        <div className="mt-4 d-flex justify-content-center">
          <button
            type="submit"
            ref={ref}
            className={"btn " + (submitted ? "btn-secondary" : "btn-quiz")}
            disabled={!currentAnswer}
            aria-disabled={!currentAnswer}
          >
            {submitted
              ? questionIndex === questions.length - 1
                ? "See Score"
                : "Next Question"
              : "Lock Answer"}
          </button>
        </div>
      </form>
      <div className="mt-4 border col-auto text-center align-middle rounded-pill bg-secondary fw-bold text-light">
        {questionIndex + 1}/{questions.length}
      </div>
    </div>
  );
};
export default QuestionBoard;
