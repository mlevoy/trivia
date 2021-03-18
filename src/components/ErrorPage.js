import { STATE } from "../views/App";
const ErrorPage = ({ state, setState }) => {
  return (
    <div className="text-center mt-5 mx-3 lead">
      {state === STATE.LOADING_FAIL ? (
        <p>Something went wrong, please try again.</p>
      ) : (
        <p>
          We could not set up a trivia session with your requested criteria.
          Please try again with a different category, difficulty level, and/or
          number of questions.
        </p>
      )}
      <button
        onClick={() => setState(STATE.SETUP)}
        className="mt-4 btn btn-quiz"
      >
        Return to Setup
      </button>
    </div>
  );
};

export default ErrorPage;
