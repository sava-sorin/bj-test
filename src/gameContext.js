import React, { useContext, createContext, useState } from "react";
import { makeApiCall } from "./utils";
const GameContext = createContext({});

export const GameDataProvider = ({ children }) => {
  const [table, setTable] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [currentBalance, setCurrentBalance] = useState(null);
  const [betValue, setBetValue] = useState(0);
  const [dealerCards, setDealerCards] = useState(null);
  const [playerCards, setPlayerCards] = useState(null);
  const [standOut, setStandOut] = useState(false);
  const [statistics, setStatistics] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getTableSession = async (e) => {
    e.preventDefault();
    const balance = parseInt(e.target.balance.value);

    if (!balance) {
      return;
    }

    setIsLoading(true);
    const request = await makeApiCall("sit", { balance });

    setTable({
      id: request.sessionId,
      betOptions: request.availableBetOptions,
    });
    setCurrentBalance(balance);
    setIsLoading(false);
  };

  const dealCards = async () => {
    if (betValue === 0) {
      return;
    }

    setIsLoading(true);
    const request = await makeApiCall("deal", {
      bet: betValue,
      sessionId: table.id,
    });
    const { dealerCards, playerCards, ...rest } = request;
    setDealerCards(request.dealerCards);
    setPlayerCards(request.playerCards);
    setCurrentBalance(request.currentBalance);
    setTableData(rest);
    setIsLoading(false);
  };

  const turnHandler = async (actionType) => {
    setIsLoading(true);
    const request = await makeApiCall("turn", {
      action: actionType,
      sessionId: table.id,
    });

    const { dealerCards, playerCard, currentBalance, ...rest } = request;
    setDealerCards([...request.dealerCards]);
    if (playerCard) {
      setPlayerCards([...playerCards, request.playerCard]);
    }
    setCurrentBalance(currentBalance);
    setTableData(rest);
    setIsLoading(false);
  };

  const standHandler = async () => {
    setIsLoading(true);
    const request = await makeApiCall("stand", {
      sessionId: table.id,
    });

    setStandOut(true);
    setTable(null);
    setTableData(null);
    setBetValue(0);
    setDealerCards(null);
    setPlayerCards(null);
    setStatistics(request);
    setIsLoading(false);
  };
  return (
    <GameContext.Provider
      value={{
        table,
        tableData,
        betValue,
        dealerCards,
        playerCards,
        standOut,
        statistics,
        currentBalance,
        isLoading,
        setBetValue,
        getTableSession,
        dealCards,
        turnHandler,
        standHandler,
        setStandOut,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
export const useGameControlls = () => useContext(GameContext);
