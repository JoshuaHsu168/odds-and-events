//State
const numberBank = [];
const oddNumbers = [];
const evenNumbers = [];

function addNumberToBank(num) {
  numberBank.push(num);
  console.log("Number Bank after add:", numberBank);
  render();
}

function sortOneNumber() {
  // 1. Check if there are any numbers in the bank to sort
  if (numberBank.length === 0) {
    console.log("Number Bank is empty. Nothing to sort.");
    return; // Exit the function if there are no numbers
  }

  // 2. Remove the first number from the numberBank
  // .shift() removes the first element from an array AND returns it.
  const numberToSort = numberBank.shift();
  console.log("Number being sorted:", numberToSort);

  // 3. Determine if the number is odd or even
  // The modulo operator (%) gives you the remainder of a division.
  // If a number divided by 2 has a remainder of 0, it's even.
  if (numberToSort % 2 === 0) {
    evenNumbers.push(numberToSort); // If even, add to evenNumbers array
    console.log("Added to even:", evenNumbers);
  } else {
    oddNumbers.push(numberToSort); // If odd, add to oddNumbers array
    console.log("Added to odd:", oddNumbers);
  }

  // Remove this line! We will now call render() once from sortAllNumbers or wherever this is triggered
  // render();
}

function sortAllNumbers() {
  console.log("Sorting all numbers...");
  // Loop as long as there are numbers in the bank
  while (numberBank.length > 0) {
    // Call sortOneNumber to process each number.
    // It will remove a number from numberBank and add it to odd/even.
    // Since we removed render() from sortOneNumber, this loop will run quickly.
    sortOneNumber();
  }
  // After all numbers are sorted, render the UI once.
  render();
  console.log("All numbers sorted.");
}

// Components
function numberForm() {
  const $form = document.createElement("form");
  $form.innerHTML = `
    <label>
    Enter a number
    <input name="numInput" type="number"/>
    </label>
    <button>Add number</button>
    `;
  $form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData($form);
    const num = data.get("numInput");
    addNumberToBank(Number(num));
  });
  return $form;
}

function bankNumber(num) {
  const $span = document.createElement("span");
  $span.classList.add("bank-number-item"); // Define this in index.css for styling
  $span.textContent = num;
  return $span;
}

function numberBankDisplay() {
  const $div = document.createElement("div");
  $div.classList.add("number-bank"); // Add a class for styling

  const $heading = document.createElement("h2");
  $heading.textContent = "Number Bank";
  $div.append($heading); // Add heading to the div

  const $numbersContainer = document.createElement("div"); // A div to hold the actual numbers
  $numbersContainer.classList.add("numbers-container"); // For potential styling of the number flow

  // Iterate over the numberBank array and create a BankNumber component for each number
  const $numbers = numberBank.map((num) => bankNumber(num));

  // Add all the generated number elements as children to the container
  $div.replaceChildren(...$numbers);

  $div.append($numbersContainer); // Add the numbers container to the main bank div

  return $div;
}

function OddNumbersDisplay() {
  const $div = document.createElement("div");
  $div.classList.add("odd-category");

  const $heading = document.createElement("h2");
  $heading.textContent = "Odd Numbers";
  $div.append($heading);

  const $numbersContainer = document.createElement("div");
  $numbersContainer.classList.add("numbers-container"); // Reusing this class for consistency

  // Map over the oddNumbers state array
  const $oddNumbersElements = oddNumbers.map((num) => bankNumber(num));
  $numbersContainer.replaceChildren(...$oddNumbersElements);

  $div.append($numbersContainer);

  return $div;
}

function EvenNumbersDisplay() {
  const $div = document.createElement("div");
  $div.classList.add("even-category");

  const $heading = document.createElement("h2");
  $heading.textContent = "Even Numbers";
  $div.append($heading);

  const $numbersContainer = document.createElement("div");
  $numbersContainer.classList.add("numbers-container"); // Reusing this class for consistency

  // Map over the evenNumbers state array
  const $evenNumbersElements = evenNumbers.map((num) => bankNumber(num));
  $numbersContainer.replaceChildren(...$evenNumbersElements);

  $div.append($numbersContainer);

  return $div;
}

// Render
function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <h1>Odds and Events</h1>
    <NumberForm></NumberForm>
    <div class="controls"> 
    <button id="sortOneButton">Sort 1</button>
    <button id="sortAllButton">Sort All</button>
    </div>
    <NumberBankDisplay></NumberBankDisplay>
    <div class="categories"> <OddNumbersDisplay></OddNumbersDisplay>
    <EvenNumbersDisplay></EvenNumbersDisplay>
    </div>
    `;
  $app.querySelector("NumberForm").replaceWith(numberForm());
  $app.querySelector("NumberBankDisplay").replaceWith(numberBankDisplay());
  document
    .querySelector("#sortOneButton")
    .addEventListener("click", sortOneNumber);
  document
    .querySelector("#sortAllButton")
    .addEventListener("click", sortAllNumbers);
  $app.querySelector("OddNumbersDisplay").replaceWith(OddNumbersDisplay());
  $app.querySelector("EvenNumbersDisplay").replaceWith(EvenNumbersDisplay());
}

render();
