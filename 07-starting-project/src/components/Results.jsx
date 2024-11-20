import { calculateInvestmentResults, formatter } from '../util/investment.js';

export default function Results({ input }) {
  const results = [];       // 함수 밖에서 선언하면 리액트에 의해 변화를 감지할 수 없으므로 동일한 메모리 내에 데이터가 추가되어 key가 중첩된다는 에러가 발생하게 됨.
  calculateInvestmentResults(input, results);

  if(results.length === 0) {
      return <p className="center">Invalid input data provided.</p>
  }

  const initialInvestment =
    results[0].valueEndOfYear -
    results[0].interest -
    results[0].annualInvestment;

  return (
    <table id="result">
      <thead>
        <tr>
          <th>Year</th>
          <th>Investment Value</th>
          <th>Interest (Year)</th>
          <th>Total Interest</th>
          <th>Invested Capital</th>
        </tr>
      </thead>
      <tbody>
        {results.map((yearData) => {
          const totalInterest =
            yearData.valueEndOfYear -
            yearData.annualInvestment * yearData.year -
            initialInvestment;
          const totalAmountInvested = yearData.valueEndOfYear - totalInterest;

          return (
            <tr key={yearData.year}>
              <td>{yearData.year}</td>
              <td>{formatter.format(yearData.valueEndOfYear)}</td>
              <td>{formatter.format(yearData.interest)}</td>
              <td>{formatter.format(totalInterest)}</td>
              <td>{formatter.format(totalAmountInvested)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
