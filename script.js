"use strict";

import weeklyCost from "./data.json" assert { type: "json" };

const graphColumns = document.querySelectorAll(".graph-bar-section");
const graphBarsContainers = document.querySelectorAll(".bar-container");
const graphBars = document.querySelectorAll(".bar");
const costCards = document.querySelectorAll(".cost-display");

let largestAmount = 0;

const calculateHeight = (dailyCost) => {
  let percentage = Math.floor((dailyCost / largestAmount) * 100);
  return (percentage / 100) * 175;
};

const populateCostCard = (cost, costCard) => {
  costCard.innerHTML = `$${cost}`;
};

for (let i = 0; i < weeklyCost.length; i++) {
  if (largestAmount < weeklyCost[i].amount) {
    largestAmount = weeklyCost[i].amount;
    graphBars.forEach((bar) => bar.classList.remove("highest"));
    graphBars[i].classList.add("highest");
  }
}

for (let j = 0; j < weeklyCost.length; j++) {
  let currentDailyCost = weeklyCost[j].amount;
  graphBarsContainers[j].style.height = `${calculateHeight(
    currentDailyCost
  )}px`;
  populateCostCard(weeklyCost[j].amount, costCards[j]);
}

graphColumns.forEach((col) => {
  col.addEventListener("mouseenter", () => {
    col.firstElementChild.style.opacity = "1";
  });
  col.addEventListener("mouseleave", () => {
    col.firstElementChild.style.opacity = "";
  });
});
