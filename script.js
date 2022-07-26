"use strict";

//Import Json file
import weeklyCost from "./data.json" assert { type: "json" };

console.log(weeklyCost)

// Assign all elements to variables
const graphColumns = document.querySelectorAll(".graph-bar-section");
const graphBarsContainers = document.querySelectorAll(".bar-container");
const graphBars = document.querySelectorAll(".bar");
const costCards = document.querySelectorAll(".cost-display");

let largestAmount = 0;

// Calculate height based on percentage of highest amount and return percentage value out of 140px

const calculateHeight = (dailyCost) => {
  let percentage = Math.floor((dailyCost / largestAmount) * 100);
  return (percentage / 100) * 140;
};

const populateCostCard = (cost, costCard) => {
  costCard.innerHTML = `$${cost}`;
};

// Find highest amount in Json file and add class to highest value

for (let i = 0; i < weeklyCost.length; i++) {
  if (largestAmount < weeklyCost[i].amount) {
    largestAmount = weeklyCost[i].amount;
    // Toggle class for largest amount
    graphBars.forEach((bar) => bar.classList.remove("highest"));
    graphBars[i].classList.add("highest");
  }
}

// Apply calculated height to each column and populate cost cards
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
