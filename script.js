const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairs = document.getElementById('show-millionairs');
const sortBtn = document.getElementById('sort');
const calculateWealth = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// fetch random user and add money
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();
  //   console.log(data);
  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };
  console.log(newUser);
  addData(newUser);
}

// Double everyone's money
function doubleMoney() {
  data = data.map((user) => {
    console.log('THIS: ', user);
    return {
      ...user,
      money: user.money * 2,
    };
  });

  updateDOM();
}

// Sorts users by riches
function sortByRichest() {
  data = data.sort((a, b) => b.money - a.money);
  updateDOM();
}

function showMillionairsNow() {
  data = data.filter(function (number) {
    return number.money > 1000000;
  });
  updateDOM();
}

function calculateTotalWealth() {
  const totalWealth = data.reduce((acc, num) => {
    return acc + num.money;
  }, 0);
  console.log(totalWealth);
  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    totalWealth
  )}</strong></h3>`;
  main.appendChild(wealthEl);
}

// Add new obj to data arr
function addData(obj) {
  data.push(obj);
  updateDOM();
  console.log('data', data);
}

// Update DOM
function updateDOM(providedData = data) {
  // Clear main div
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  // for(i = 0; i < providedData.length; i++) {
  //     providedData[i]
  // }

  providedData.forEach((item) => {
    // create element
    const element = document.createElement('div');
    // add person class
    element.classList.add('person');
    // innerHTL property for name and money
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    // append to main
    main.appendChild(element);
  });
}

// Format number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string

function formatMoney(number) {
  return `$` + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Event Listeners
addUserBtn.addEventListener('click', getRandomUser);

doubleBtn.addEventListener('click', doubleMoney);

sortBtn.addEventListener('click', sortByRichest);

showMillionairs.addEventListener('click', showMillionairsNow);

calculateWealth.addEventListener('click', calculateTotalWealth);
