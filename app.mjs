const mobileNumber = document.querySelector(".mobile-number");
function startApp() {
  mobileNumber.addEventListener("keyup", checkNumber);
  mobileNumber.addEventListener("change", checkNumber);
}
const suggestionCover = document.querySelector(".form-section");
const suggestionList = document.querySelector(".suggestion-list");

suggestionCover.addEventListener("click", displayClicked);

function displayClicked(e) {
  let target = e.target;
  if (target.className == "suggestion-list-item") {
    mobileNumber.value = target.innerText;
    loadData(String(mobileNumber.value));
    suggestionList.style.display = "none";
  }
}

let response;
let xhr = new XMLHttpRequest();

xhr.open("GET", "./nnetworks.json", true);

xhr.onload = function () {
  response = JSON.parse(this.responseText);
};
xhr.send();

function checkNumber() {
  const mobileNumberValue = this.value;

  const firstFourDigits = /^[0][0-9]/.test(mobileNumberValue)
    ? Number(String(mobileNumberValue).slice(0, 5))
    : Number(String(mobileNumberValue).slice(0, 4));

  loadData(String(firstFourDigits));

  if (this.value == "") {
    suggestionList.innerHTML = "";
    suggestionList.classList.remove("extended");
  } else {
    let newwwww = displaySuggestionToUI(
      getMatches(response, String(firstFourDigits))
    );

    if (newwwww) {
      suggestionList.innerHTML = newwwww;
      suggestionList.classList.add("extended");
    } else {
      suggestionList.innerHTML = "";
      suggestionList.classList.remove("extended");
    }
  }
}

function loadData(mobile) {
  let network;

  response.mtn.forEach((prefix) => {
    if (mobile.includes(String(prefix))) {
      if (network == undefined) {
        network = "mtn";
      }
    }
  });

  response.glo.forEach((prefix) => {
    if (mobile.includes(String(prefix))) {
      if (network == undefined) {
        network = "glo";
      }
    }
  });

  response.airtel.forEach((prefix) => {
    if (mobile.includes(String(prefix))) {
      if (network == undefined) {
        network = "airtel";
      }
    }
  });

  response.etisalat.forEach((prefix) => {
    if (mobile.includes(String(prefix))) {
      if (network == undefined) {
        network = "etisalat";
      }
    }
  });

  ChangeLogo(network);
}

function getMatches(response, textToSearch) {
  let allNewtwork = [];
  const newResponse = Object.values(response).forEach((network) => {
    allNewtwork.push(network);
  });

  const arrayResponse = allNewtwork
    .reduce((firstarray = [], next) => {
      return firstarray.concat(next);
    })
    .map((networknumber) => "0" + networknumber);

  return arrayResponse.filter((networkNumber) => {
    let regex = new RegExp(textToSearch, "gi");
    return networkNumber.match(regex);
  });
}

function ChangeLogo(networkName) {
  const imageParent = document.querySelector(".network-logo");
  switch (networkName) {
    case "glo":
      imageParent.innerHTML = `<img src="./images/glo.png" alt="network logo" />`;
      break;
    case "mtn":
      imageParent.innerHTML = `<img src="./images/mtn.jpg" alt="network logo" />`;
      break;
    case "etisalat":
      imageParent.innerHTML = `<img src="./images/9mobile.png" alt="network logo" />`;
      break;
    case "airtel":
      imageParent.innerHTML = `<img src="./images/airtel.png" alt="network logo" />`;
      break;

    default:
      imageParent.innerHTML = `<img src="./images/default.svg" />`;
  }
}

function displaySuggestionToUI(responseFromSearch) {
  let toDisplay = "";
  suggestionList.style.display = "inline-block";
  responseFromSearch.forEach((telNumber) => {
    toDisplay += `<li class= 'suggestion-list-item'>${telNumber}</li>`;
  });

  return toDisplay;
}

// ======= DO NOT EDIT ============== //
export default startApp;
// ======= EEND DO NOT EDIT ========= //
