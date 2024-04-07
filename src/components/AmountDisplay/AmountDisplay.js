import "./AmountDisplay.css"

const AmountDisplay = (amountData) => {
    const { currency, amount } = amountData;
    return (
        <div className="amount-display-block">
            {currency} {amount}
        </div>
    );
}

export default AmountDisplay;
