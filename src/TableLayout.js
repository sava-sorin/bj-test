import TableControls from "./TableControls";
import TableArea from "./TableArea";
import { useGameControlls } from "./gameContext";

const TableLayout = () => {
  const {
    table,
    tableData,
    standHandler,
    dealCards,
    turnHandler,
    betValue,
    currentBalance,
  } = useGameControlls();
  const { id } = table;
  return (
    <div>
      <h3>Table: {id}</h3>
      {table && <TableControls />}
      <div style={{ display: "block", marginBottom: "50px" }} />
      {tableData && (
        <>
          <TableArea />
          <div style={{ textAlign: "center", margin: "10px 0" }}>
            {tableData.roundEnded ? (
              <>
                <button
                  style={{ margin: "0 10px" }}
                  onClick={() => standHandler()}
                >
                  Stand
                </button>
                <button
                  style={{ margin: "0 10px" }}
                  onClick={() => dealCards()}
                  disabled={betValue === 0 || currentBalance < betValue}
                >
                  Deal
                </button>
              </>
            ) : (
              <>
                <button
                  style={{ margin: "0 10px" }}
                  onClick={() => turnHandler("hit")}
                >
                  Hit
                </button>
                <button
                  style={{ margin: "0 10px" }}
                  onClick={() => turnHandler("stay")}
                >
                  Stay
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TableLayout;
