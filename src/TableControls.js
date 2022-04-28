import { useGameControlls } from "./gameContext";

const TableControls = () => {
  const {
    table: { betOptions },
    tableData,
    currentBalance,
    setBetValue,
    betValue,
    dealCards,
  } = useGameControlls();
  const isPlaying =
    tableData?.roundEnded !== undefined && !tableData?.roundEnded;
  return (
    <>
      <div className="bet-controlls-row">
        {betOptions.map((betItem, idx) => (
          <button
            key={idx}
            onClick={() => setBetValue(betItem)}
            disabled={isPlaying}
          >
            {betItem}
          </button>
        ))}
        <button onClick={() => setBetValue(0)} disabled={isPlaying}>
          Reset bet value!
        </button>
      </div>
      <div className="bet-controlls-row --vertical">
        <h4>Bet value: {betValue}</h4>
        <h4>Current Balance: {currentBalance}</h4>
        <button
          onClick={dealCards}
          disabled={betValue === 0 || currentBalance < betValue || isPlaying}
        >
          Place bet!
        </button>
      </div>
    </>
  );
};

export default TableControls;
