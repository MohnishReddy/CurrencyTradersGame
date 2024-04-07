import './App.css';
import GamePage from './pages/GamePage/GamePage';
import LandingPage from './pages/LandingPage/LandingPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  
  const supportedCurrencies = [
    "EUR", "USD", "JPY", "BGN", "CZK", "DKK", "GBP", "HUF", "PLN", "RON",
    "SEK", "CHF", "ISK", "NOK", "HRK", "RUB", "TRY", "AUD", "BRL", "CAD",
    "CNY", "HKD", "IDR", "ILS", "INR", "KRW", "MXN", "MYR", "NZD", "PHP",
    "SGD", "THB", "ZAR"
  ];

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage supportedCurrencies={supportedCurrencies} />} />
        <Route path="/game" element={<GamePage supportedCurrencies={supportedCurrencies}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
