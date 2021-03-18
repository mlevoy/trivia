import Setup from "../components/Setup";
import QuestionBoard from "../components/QuestionBoard";
import ScoreBoard from "../components/ScoreBoard";
import Loading from "../components/Loading";
import ErrorPage from "../components/ErrorPage";

import { useState, useEffect } from "react";
export const STATE = {
  SETUP: "setup",
  LOADING_QUESTIONS: "loading questions",
  LOADING_FAIL: "loading fail",
  LOADING_SUCCESS: "play",
  FINISHED: "finish",
};

const requestQuestions = async (number, difficulty, category) => {
  let response;
  let completeUrl = url + `amount=${number}`;
  if (difficulty === "any" && category === "any") {
    response = await fetch(completeUrl);
  } else {
    if (difficulty !== "any") {
      completeUrl += `&difficulty=${difficulty}`;
    }
    if (category !== "any") {
      completeUrl += `&category=${category}`;
    }

    response = await fetch(completeUrl);
  }
  let questionData = await response.json();
  return questionData;
};
const url = "https://opentdb.com/api.php?";

const App = () => {
  const [state, setState] = useState(STATE.SETUP);
  const [questions, setQuestions] = useState(null);
  const [params, setParams] = useState({
    number: "3",
    difficulty: "any",
    category: "any",
  });
  const [score, updateScore] = useState(0);
  useEffect(() => {
    if (state === STATE.LOADING_QUESTIONS) {
      requestQuestions(params.number, params.difficulty, params.category)
        .then((data) => {
          setQuestions(data);
        })
        .catch((error) => {
          setState(STATE.LOADING_FAIL);
          console.log(error);
        });
    }
  }, [state, params.number, params.difficulty, params.category]);
  useEffect(() => {
    if (state === STATE.SETUP) {
      setParams({
        number: "3",
        difficulty: "any",
        category: "any",
      });
      setQuestions(null);
      updateScore(0);
    }
  }, [state]);
  useEffect(() => {
    if (state === STATE.LOADING_QUESTIONS && questions) {
      setState(STATE.LOADING_SUCCESS);
    }
  }, [questions, state]);
  return (
    <div className="container-fluid">
      <div className="row text-center bg-quiz-blue">
        <h1 className="display-2 fw-bold text-light">
          What Do <em>YOU</em> Know?!
        </h1>
      </div>

      {state === STATE.SETUP ? (
        <Setup setParams={setParams} params={params} setState={setState} />
      ) : state === STATE.LOADING_QUESTIONS ? (
        <Loading />
      ) : state === STATE.LOADING_SUCCESS ? (
        <QuestionBoard
          questions={questions.results}
          setState={setState}
          score={score}
          updateScorePercentage={updateScore}
        />
      ) : STATE.FINISHED ? (
        <ScoreBoard score={score} number={params.number} setState={setState} />
      ) : (
        <ErrorPage state={state} setState={setState} />
      )}
    </div>
  );
};

export default App;
