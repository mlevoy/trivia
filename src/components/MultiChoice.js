import { parseEntities } from "./QuestionBoard";

const MultiChoice = ({
  question,
  answers,
  submitted,
  setCurrentAnswer,
  currentAnswer,
}) => {
  return answers.map((answer, index) => (
    <div className="my-2 row justify-content-center" key={index}>
      <div className="radio-toolbar col-12 col-sm-8 col-md-6 row lead fs-4 ">
        <input
          disabled={submitted}
          aria-disabled={submitted}
          type="radio"
          name="mc"
          id={answer}
          value={answer}
          checked={currentAnswer === answer}
          onFocus={(e) => setCurrentAnswer(e.target.value)}
          //for safari
          onClick={(e) => setCurrentAnswer(e.target.value)}
          onChange={() => {}}
        />
        <label
          htmlFor={answer}
          className={
            "lead fs-4 text-center  " +
            (submitted && answer === question.correct_answer
              ? "bg-success text-light"
              : submitted && answer !== question.correct_answer
              ? "half-opacity text-dark"
              : "")
          }
        >
          {parseEntities(answer)}
        </label>
      </div>
    </div>
  ));
};
export default MultiChoice;
