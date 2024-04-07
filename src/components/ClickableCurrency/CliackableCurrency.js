import "./ClickableCurrency.css"

const ClickableCurrency = (currencyData) => {
const { currency, onClick } = currencyData;

    return (
        <div className="currency-option-button-wrapper">
            <button className="currency-option-button" onClick={onClick}>
                {currency}
            </button>
        </div>
    )
}

export default ClickableCurrency;