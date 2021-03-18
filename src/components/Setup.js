import { STATE } from "../views/App";
import { useState } from "react";
const Setup = (props) => {
  const [error, setError] = useState("");
  const validateInput = (input) => {
    if ((parseInt(input) > 0 && parseInt(input) < 101) || input === "") {
      error && setError("");
      props.setParams({ ...props.params, number: input });
    }
  };
  return (
    <div className="m-4">
      <div className="row text-center mb-4">
        <h2 className="quiz-blue">Choose your settings:</h2>
      </div>
      <form
        onSubmit={(e) => 
            {e.preventDefault()
             props.setState(STATE.LOADING_QUESTIONS)}}
      >
        <div className="row justify-content-center">
          <div className="col-12 col-sm-4 col-md-3">
            <label htmlFor="number">
              <small>Number of Questions</small>
            </label>
            <input
              min="1"
              max="100"
              type="number"
              className="form-control"
              id="number"
              value={props.params.number}
              onChange={(e) => validateInput(e.target.value)}
            />
          </div>
          <div className="col-12 col-sm-4">
            <label htmlFor="question-type">
              <small>Category</small>
            </label>
            <select
              className="form-select"
              id="question-type"
              value={props.params.category}
              onChange={(e) =>
                props.setParams({ ...props.params, category: e.target.value })
              }
            >
              <option value="any">Any Category</option>
              <option value="9">General Knowledge</option>
              <option value="10">Entertainment: Books</option>
              <option value="11">Entertainment: Film</option>
              <option value="12">Entertainment: Music</option>
              <option value="13">Entertainment: Musicals & Theatres</option>
              <option value="14">Entertainment: Television</option>
              <option value="15">Entertainment: Video Games</option>
              <option value="16">Entertainment: Board Games</option>
              <option value="17">Science & Nature</option>
              <option value="18">Science Computers</option>
              <option value="19">Science: Mathematics</option>
              <option value="20">Mythology</option>
              <option value="21">Sports</option>
              <option value="22">Geography</option>
              <option value="23">History</option>
              <option value="24">Politics</option>
              <option value="25">Art</option>
              <option value="26">Celebrities</option>
              <option value="27">Animals</option>
              <option value="28">Vehicles</option>
              <option value="29">Entertainment: Comics</option>
              <option value="30">Science: Gadgets</option>
              <option value="31">Entertainment: Japanese Anime & Manga</option>
              <option value="32">Entertainment: Cartoon & Animations</option>
            </select>
          </div>
          <div className="col-12 col-md-3 col-sm-4">
            <label htmlFor="question-difficulty">
              <small>Difficulty </small>
            </label>
            <select
              className="form-select"
              id="question-difficulty"
              value={props.params.difficulty}
              onChange={(e) =>
                props.setParams({ ...props.params, difficulty: e.target.value })
              }
            >
              <option value="any">Any Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div className="col-12 col-sm-4 mt-5 d-flex justify-content-center">
            <button type="submit" className="btn btn-quiz px-3 px-md-5 ">
              Start Game
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Setup;
