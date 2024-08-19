import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./App.css"; // Importing the updated App.css
import axios from "axios"; // Correcting the axios import

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getExchange = async () => {
      try {
        let url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
        const response = await axios.get(url);
        const rate = response.data.rates[toCurrency];
        setConvertedAmount((amount * rate).toFixed(2));
      } catch (error) {
        setError("Failed to fetch exchange rate");
        console.error("Error", error);
      }
    };
    getExchange();
  }, [fromCurrency, toCurrency, amount]);

  const handleAmount = (e) => {
    const value = parseFloat(e.target.value);
    setAmount(isNaN(value) ? 0 : value);
  };

  const handleFromCurrency = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrency = (e) => {
    setToCurrency(e.target.value);
  };

  return (
    <>
      <div className="container">
        <div className="currency-converter p-5 bg-dark">
          <div className="box shadow p-3 mb-5 bg-white rounded cur"></div>
          <div className="data">
            <h1 className="text-center">Currency Converter</h1>
            <div className="input-container mb-3">
              <label htmlFor="amount" className="form-label">
                Amount :
              </label>
              <input
                type="text"
                id="amount"
                className="form-control"
                placeholder="Enter Amount"
                value={amount}
                onChange={handleAmount}
              />
            </div>
            <div className="input-container mb-3">
              <label htmlFor="fromcurrency" className="form-label">
                From Currency :
              </label>
              <select
                name="fromcurrency"
                id="fromcurrency"
                className="form-select"
                value={fromCurrency}
                onChange={handleFromCurrency}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="JPY">JPY</option>
                <option value="AUD">AUD</option>
                <option value="IND">INR</option>
              </select>
            </div>
            <div className="input-container mb-3">
              <label htmlFor="tocurrency" className="form-label">
                To Currency :
              </label>
              <select
                name="tocurrency"
                id="tocurrency"
                className="form-select"
                value={toCurrency}
                onChange={handleToCurrency}
              >
                <option value="IND">INR</option>

                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="JPY">JPY</option>
                <option value="AUD">AUD</option>
              </select>
            </div>
            <div className="result mt-4">
              <p>
                {amount} {fromCurrency} is equal to {convertedAmount}{" "}
                {toCurrency}
              </p>
              {error && <p className="text-danger">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
