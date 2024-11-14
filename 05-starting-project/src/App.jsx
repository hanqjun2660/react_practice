import Header from "./component/Header.jsx";
import UserInput from "./component/UserInput.jsx";
import {useState} from "react";
import Results from "./component/Results.jsx";

function App() {
  const [userInput, setUserInput] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10
  });

  const inputIsValid = userInput.duration >= 1;

  function handleChange(inputIdentifier, newValue) {
    setUserInput(prevUserInput => {
      return {
        // 이전 상태 모두 유지
        ...prevUserInput,
        // 새로 들어온 상태만 업데이트
        [inputIdentifier]: +newValue  // +를 붙이면 문자열 값을 숫자 값으로 강제함
      };
    });
  }

  return (
    <>
      <Header />
      <UserInput userInput={userInput} onChange={handleChange} />
      {!inputIsValid && <p className="center">Please enter a duration greater then zero</p>}
      {inputIsValid && <Results input={userInput} />}
    </>
  );
}

export default App
