import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./LandingPage.css"

const LandingPage = (props) => {
    const preferedCurrencyLSKey = "prefered_currency"
    const { supportedCurrencies } = props

    const navigate = useNavigate()
    const storedPreferredCurrency = localStorage.getItem(preferedCurrencyLSKey)
    const [selectedCurrency, setSelectedCurrency] = useState(storedPreferredCurrency);

    const handleCurrencyChange = (event) => {
        const selectedCurrencyOpt = event.target.value
        setSelectedCurrency(selectedCurrencyOpt);
        console.log(selectedCurrencyOpt)
        localStorage.setItem(preferedCurrencyLSKey, selectedCurrencyOpt)
    };

    const handleStartGame = () => {
        navigate("/game")
    }

    return (
        <div id="landing-page">
            <div id='landing-page-block'>
                <div className='heading-block'>
                <h1>Currency Traders</h1>
                <h3>Select your preferred currency to start the game</h3>
                </div>
                <div id="select-currency-block">
                    <div id="currency-options-dropdown" className="dropdown-block">
                        <select id="my-currency-selector" value={selectedCurrency} onChange={handleCurrencyChange}>
                        <option value="">Select Currency</option>
                        {supportedCurrencies.map(currency => (
                            <option key={currency} value={currency}>{currency}</option>
                        ))}
                        </select>
                    </div>
                    <button id="start-game-button" disabled={!selectedCurrency} onClick={handleStartGame}>Start Game!</button>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;