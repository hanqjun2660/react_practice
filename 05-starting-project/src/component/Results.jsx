import {calculateInvestmentResults, formatter} from "../util/investment.js";

export default function Results({ input }) {
    const resultData = calculateInvestmentResults(input);
    const initialInvestment = resultData[0].valueEndOfYear - resultData[0].interest - resultData[0].annualInvestment;

    console.log(resultData);

    return(
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
                {resultData.map(yearData => {
                    const totalInterrest = yearData.valueEndOfYear - yearData.annualInvestment * yearData.year - initialInvestment;
                    const totalAmountInvestment = yearData.valueEndOfYear - totalInterrest;

                    return(
                      <tr key={yearData.year}>
                          <td>{yearData.year}</td>
                          <td>{formatter.format(yearData.valueEndOfYear)}</td>
                          <td>{formatter.format(yearData.annualInvestment)}</td>
                          <td>{formatter.format(totalInterrest)}</td>
                          <td>{formatter.format(totalAmountInvestment)}</td>
                      </tr>
                    );
                })}
            </tbody>
        </table>
    );
}