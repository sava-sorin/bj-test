import { useGameControlls } from "./gameContext";
import { calculateHandValue } from "./utils";

const CardContainer = ({ card: { rank, suite } }) => {
  return (
    <div>
      <p style={{ textAlign: "center" }}>{rank}</p>
      <p style={{ textAlign: "center" }}>({suite})</p>
    </div>
  );
};

const TableArea = () => {
  const { dealerCards, playerCards } = useGameControlls();
  return (
    <div style={{ border: "1px solid black" }}>
      <div className="game-player-container">
        <h3>Dealer</h3>
        <div className="game-player-place">
          {dealerCards?.map((card, idx) => (
            <CardContainer key={idx} card={card} />
          ))}
        </div>
        <h3>Hand value: {calculateHandValue(dealerCards)}</h3>
      </div>
      <div className="game-player-container">
        <h3>Player</h3>
        <div className="game-player-place">
          {playerCards?.map((card, idx) => (
            <CardContainer key={idx} card={card} />
          ))}
        </div>
        <h3>Hand value: {calculateHandValue(playerCards)}</h3>
      </div>
    </div>
  );
};

export default TableArea;
