const amountRange = document.getElementById("amountRange");
const amountNumber = document.getElementById("amountNumber");
const form = document.getElementById("form");
const passwordDisplay = document.getElementById("passwordDisplay");
const includeUpperEl = document.getElementById("includeUpper");
const includeLowerEl = document.getElementById("includeLower");
const includeNumberEl = document.getElementById("includeNumber");
const includeSpecialEl = document.getElementById("includeSpecial");
const excludeSimilarEl = document.getElementById("excludeSimilar");
const excludeAmbiguousEl = document.getElementById("excludeAmbiguous");

const upperChars = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const lowerChars = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const numberChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const similarChars = ["i", "I", "l", "1", "L", "o", "0", "O"];
const specialChars = ["!", "@", "#", "$", "%", "^", "&", "*", "+", "=", "?", "_", "-", "|", "{", "}", "[", "]", "(", ")", "/", "\\", "'", '"', "`", "~", ",", ";", ":", ".", "<", ">"];
const ambiguousChars = ["{", "}", "[", "]", "(", ")", "/", "\\", "'", '"', "`", "~", ",", ";", ":", ".", "<", ">"];

amountRange.addEventListener("input", syncAmountValue);
amountNumber.addEventListener("input", syncAmountValue);

function syncAmountValue(e) {
  const value = e.target.value;
  amountRange.value = value;
  amountNumber.value = value;
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const charAmount = amountNumber.value;
  const includeUpper = includeUpperEl.checked;
  const includeLower = includeLowerEl.checked;
  const includeNumber = includeNumberEl.checked;
  const includeSpecial = includeSpecialEl.checked;
  const excludeSimilar = excludeSimilarEl.checked;
  const excludeAmbiguous = excludeAmbiguousEl.checked;
  const password = generatePassword(charAmount, includeUpper, includeLower, includeNumber, includeSpecial, excludeSimilar, excludeAmbiguous);
  passwordDisplay.textContent = password;
});

function generatePassword(charAmount, includeUpper, includeLower, includeNumber, includeSpecial, excludeSimilar, excludeAmbiguous) {
  let charList = lowerChars;
  if (includeUpper) charList = charList.concat(upperChars);
  if (includeLower) charList = (charList.filter(item => !lowerChars.includes(item))).concat(lowerChars);
  if (includeNumber) charList = charList.concat(numberChars);
  if (includeSpecial) charList = charList.concat(specialChars);
  if (excludeSimilar) charList = charList.filter(item => !similarChars.includes(item));
  if (excludeAmbiguous) charList = charList.filter(item => !ambiguousChars.includes(item));
  console.log(charList);
  const passwordChars = [];
  
  for (let i = 0; i < charAmount; i++) {
    const character = charList[Math.floor(Math.random()*charList.length)];
    passwordChars.push(character);
  }
  return passwordChars.join("");
}

function arrayFromLowToHigh(low, high) {
  const array = [];
  for (let i = low; i<= high; i++) {
    array.push(i);
  }
  return array;
}

function copy() {
  passwordDisplay.select()
  document.execCommand("copy");
  navigator.clipboard.writeText(passwordDisplay.textContent);
}