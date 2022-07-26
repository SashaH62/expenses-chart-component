"use strict";

//Import Json file
// const response = await fetch(urlOrRequest[, options])
// import weeklyCost from "./data.json" assert { type: "json" };

console.log(weeklyCost)

// Assign all elements to variables
const graphColumns = document.querySelectorAll(".graph-bar-section");
const graphBarsContainers = document.querySelectorAll(".bar-container");
const graphBars = document.querySelectorAll(".bar");
const costCards = document.querySelectorAll(".cost-display");

let lgAmount = 0;

// Calculate height based on percentage of highest amount and return percentage value out of 140px

const calculateHeight = (dailyCost, fn) => {
  let percentage = Math.floor((dailyCost / fn) * 100);
  return (percentage / 100) * 140;
};

const populateCostCard = (cost, costCard) => {
  costCard.innerHTML = `$${cost}`;
};

// Find highest amount in Json file and add class to highest value

const findLargest = (weeklyCost) => {
  let largestAmount = 0;
  for (let i = 0; i < weeklyCost.length; i++) {
    if (largestAmount < weeklyCost[i].amount) {
      largestAmount = weeklyCost[i].amount;
      lgAmount = largestAmount;
      // Toggle class for largest amount
      graphBars.forEach((bar) => bar.classList.remove("highest"));
      graphBars[i].classList.add("highest");
    }
  }
  return largestAmount;
};

// Apply calculated height to each column and populate cost cards

const setHeight = (weeklyCost) => {
  for (let j = 0; j < weeklyCost.length; j++) {
    let currentDailyCost = weeklyCost[j].amount;
    graphBarsContainers[j].style.height = `${calculateHeight(
      currentDailyCost,
      findLargest(weeklyCost)
    )}px`;
    populateCostCard(weeklyCost[j].amount, costCards[j]);
  }
};

graphColumns.forEach((col) => {
  col.addEventListener("mouseenter", () => {
    col.firstElementChild.style.opacity = "1";
  });
  col.addEventListener("mouseleave", () => {
    col.firstElementChild.style.opacity = "";
  });
});

fetch("/data.json", {
  method: "GET",
})
  .then(function (response) {
    return response.json();
  })
  .then(function (json) {
    setHeight(json);
  });
