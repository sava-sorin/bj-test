import { useGameControlls } from "./gameContext";
import TableLayout from "./TableLayout";

const App = () => {
  const {
    table,
    getTableSession,
    standOut,
    statistics,
    setStandOut,
    isLoading,
  } = useGameControlls();

  return (
    <div className="inner-section">
      <h1>BlackJack project</h1>
      {isLoading && (
        <div className="loader-container">
          <div className="loader">Loading...</div>
        </div>
      )}
      {standOut ? (
        <>
          <p>Rounds played: {statistics.roundsPlayed}</p>
          <p>Balance after this session: {statistics.winAmount}</p>
          <button onClick={() => setStandOut(false)}>Play again</button>
        </>
      ) : !table ? (
        <form onSubmit={getTableSession}>
          <input type="number" name="balance" placeholder="Balance" />
          <button type="submit">Start</button>
        </form>
      ) : (
        <TableLayout />
      )}
    </div>
  );
};

export default App;
