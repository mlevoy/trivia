import { STATE } from "../views/App";
const ScoreBoard = ({ score, number, setState }) => {
  let aced = score === parseInt(number);
  return (
    <>
      <div className="row justify-content-center text-center mt-5">
        {aced && (
          <div className="display-3 fw-bold mb-2 quiz-blue">Congrats!!!</div>
        )}
        <h2 className="display-3 fw-bold quiz-blue">
          <em>You</em> know {parseInt((score / number) * 100)}% of the things.
        </h2>
      </div>
      <div className="row justify-content-center text-center mt-3 lead">
        {score} out of {number} questions answered correctly.
      </div>
      <div className="mt-5 d-flex justify-content-center">
        <button
          autoFocus
          className={"btn px-3 px-md-5 btn-quiz"}
          onClick={() => setState(STATE.SETUP)}
        >
          Play Again
        </button>
      </div>
    </>
  );
};

export default ScoreBoard;
