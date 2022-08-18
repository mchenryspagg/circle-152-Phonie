const mobileNumber = document.querySelector(".mobile-number"),
  suggestionList = document.querySelector(".suggestion-list"),
  suggestionCover = document.querySelector(".form-section");

suggestionCover.addEventListener("click", displayClicked);

function displayClicked(e) {
  let target = e.target;
  if (target.className == "suggestion-list-item") {
    suggestionList.style.visibility = "visible";
    mobileNumber.value = target.innerText;
    loadData(String(mobileNumber.value));
  }
  // suggestionList.style.visibility = "hidden";
}

mobileNumber.addEventListener("change", checkNumber);
mobileNumber.addEventListener("keyup", checkNumber);
var response;

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
  } else {
    suggestionList.innerHTML = displaySuggestionToUI(
      getMatches(response, String(firstFourDigits))
    );
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

  response.etisalat.forEach((prefix) => {
    if (mobile.includes(String(prefix))) {
      if (network == undefined) {
        network = "etisalat";
      }
    }
  });

  ChangeLogo(network);

  // console.log(network);
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
    regex = new RegExp(textToSearch, "gi");
    return networkNumber.match(regex);
  });
}

function ChangeLogo(networkName) {
  // Write code that will enable the logo image to change based on the network name

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
  responseFromSearch.forEach((telNumber) => {
    toDisplay += `<li class= 'suggestion-list-item'>${telNumber}</li>`;
  });

  return toDisplay;
}
