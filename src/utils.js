export const makeApiCall = async (endpoint, body) => {
  const baseApiURL =
    "https://whispering-coast-73250.herokuapp.com/https://blackjack.fuzz.me.uk";
  const request = await fetch(`${baseApiURL}/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(body),
  });
  if (request.status !== 200) {
    throw new Error("Something went wrong!");
  }

  const response = await request.json();
  return response;
};

export const calculateHandValue = (cards) => {
  const smallCards = [2, 3, 4, 5, 6, 7, 8, 9];
  const highCards = ["10", "J", "Q", "K"];
  let totalValue = 0;
  let cardsValuesArr = cards.map((item) => item.rank);
  cardsValuesArr.sort();
  cardsValuesArr.push(cardsValuesArr.splice(cardsValuesArr.indexOf("A"), 1)[0]);
  cards.forEach((card) => {
    if (smallCards.includes(parseInt(card.rank))) {
      totalValue = totalValue + parseInt(card.rank);
    }

    if (highCards.includes(card.rank.toString())) {
      totalValue = totalValue + 10;
    }

    if (card.rank === "A") {
      if (totalValue + 11 > 21) {
        totalValue = totalValue + 1;
      } else {
        totalValue = totalValue + 11;
      }
    }
  });

  return totalValue;
};
