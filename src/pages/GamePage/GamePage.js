import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "./GamePage.css"
import AmountDisplay from '../../components/AmountDisplay/AmountDisplay';
import ClickableCurrency from '../../components/ClickableCurrency/CliackableCurrency';
import HorizontalLineTimer from '../../components/HorizontalLineTimer/HorizontalLineTimer';
import ScoreDisplay from '../../components/ScoreDisplay/ScoreDisplay';

const GamePage = (props) => {
  const navigate = useNavigate()
  const baseCurrency = localStorage.getItem("prefered_currency");
  useEffect(() => {
    if (baseCurrency === null) {
      navigate("/");
    } else {
      next()
    }
  }, [navigate]);

  const { supportedCurrencies } = props
  const encodedCurrencyString = supportedCurrencies.join('%2C');

  console.log(encodedCurrencyString);

  const [baseAmount, setBaseAmount] = useState(1000);
  const [isGameOver, setIsGameOver] = useState(false)
  const [choices, setChoices] = useState([]);
  const [highScore, setHighScore] = useState(1000);

  const [exchangeRates, setExchangeRates] = useState({});

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        console.log("API call made!")
        const response = await fetch('https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_dxjXP2odtQxs9nrthEmcvnF6ErUU0TqhHRq9dAbJ&currencies='+encodedCurrencyString+'&base_currency='+baseCurrency);
        const data = await response.json();
        var exchangeRateMap = {}
        for (const currency in data.data) {
          exchangeRateMap[currency] = data.data[currency];
        }
        setExchangeRates(exchangeRateMap);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
    };

    fetchExchangeRates();
  }, []);

  // Function to calculate exchange amount
  const calculateExchangeAmount = (fromCurrency, toCurrency) => {
    const newBaseAmount = baseAmount * (exchangeRates[toCurrency] / exchangeRates[fromCurrency])
    if(newBaseAmount < 1) {
      gameOver()
    }
    setBaseAmount(newBaseAmount);
    next()
  };

  const givePenalty = () => {
    setBaseAmount(prevBaseAmount => {
      console.log(prevBaseAmount);
      if (prevBaseAmount < 1) {
        gameOver();
        return prevBaseAmount; // No change to baseAmount
      }
      return prevBaseAmount - (0.1 * prevBaseAmount);
    });
    next();
  };

  // Function to get a random currency
  const getRandomCurrency = () => {
    const randomIndex = Math.floor(Math.random() * supportedCurrencies.length);
    return supportedCurrencies[randomIndex];
  };

  const next = () => {
    if(baseAmount > highScore) {
      setHighScore(() => {
        return baseAmount
      })
    }
    setChoices(() => {
      return [
        getRandomCurrency(),
        getRandomCurrency()
      ]
    })
  }

  const gameOver = () => {
    localStorage.removeItem("prefered_currency")
    navigate("/")
    setIsGameOver(() => {return true})
  }

  return (
    <div id="game-page">
      <header id="game-page-header">
      </header>
      <div id="high-score" className='score-block'>
        <div className='score-section'>
          <span className='score-label'>Current Score</span>
          <ScoreDisplay score={baseAmount}/>
        </div>
        <div className='score-section'>
          <span className='score-label'>High Score</span>
          <ScoreDisplay score={highScore}/>
        </div>
      </div>
      <div id="game-name-section">
        Currency Traders
      </div>
      <div id="game-dialog">
        <HorizontalLineTimer totalSeconds="12" whenOver={givePenalty} isGameOver={isGameOver}/>
        <div id="select-options-block">
          <ClickableCurrency currency={choices[0]} onClick={() => calculateExchangeAmount(baseCurrency, choices[0])}/>
          <ClickableCurrency currency={choices[1]} onClick={() => calculateExchangeAmount(baseCurrency, choices[1])}/>
        </div>
      </div>
      <div id="amount-display-block">
        <span>Your balance: </span>
        <AmountDisplay currency={baseCurrency} amount={baseAmount}/>
      </div>
    </div>
  );
};

export default GamePage;
