function startApp() {
  const mobileNumber = document.querySelector(".mobile-number");
  mobileNumber.addEventListener("keyup", checkNumber);
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

// ======= DO NOT EDIT ============== //
export default startApp;
// ======= EEND DO NOT EDIT ========= //
