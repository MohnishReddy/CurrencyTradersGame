import "./ScoreDisplay.css"

const ScoreDisplay = (scoreData) => {
    const { score } = scoreData;

    return (
        <div className="score-section">
            {score}
        </div>
    )
}

export default ScoreDisplay;