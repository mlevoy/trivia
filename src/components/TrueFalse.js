const TrueFalse = ({
  question,
  index,
  submitted,
  currentAnswer,
  setCurrentAnswer,
}) => {
  return (
    <>
      <div className="my-2 row justify-content-center">
        <div className="radio-toolbar text-center lead fs-4 col-12 col-sm-8 col-md-6 row ">
          <input
            type="radio"
            disabled={submitted}
            aria-disabled={submitted}
            name="tf"
            id={"true" + index}
            value="True"
            checked={currentAnswer === "True"}
            onFocus={(e) => setCurrentAnswer(e.target.value)}
            //for safari
            onClick={(e) => setCurrentAnswer(e.target.value)}
            onChange={() => {}}
          />
          <label
            htmlFor={"true" + index}
            className={
              submitted && "True" === question.correct_answer
                ? "bg-success text-light"
                : submitted && "True" !== question.correct_answer
                ? "half-opacity text-dark"
                : ""
            }
          >
            True
          </label>
        </div>
      </div>
      <div className="row radio-toolbar justify-content-center my-3">
        <div className="text-center lead fs-4 col-12 col-sm-8 col-md-6 row">
          <input
            type="radio"
            disabled={submitted}
            aria-disabled={submitted}
            name="tf"
            id={"false" + index}
            value="False"
            checked={currentAnswer === "False"}
            onFocus={(e) => setCurrentAnswer(e.target.value)}
            onChange={() => {}}
          />
          <label
            htmlFor={"false" + index}
            className={
              submitted && "False" === question.correct_answer
                ? "bg-success text-light"
                : submitted && "False" !== question.correct_answer
                ? "half-opacity text-dark"
                : ""
            }
          >
            False
          </label>
        </div>
      </div>
    </>
  );
};

export default TrueFalse;
