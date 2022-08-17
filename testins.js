const mobileNumber = document.querySelector(".mobile-number");
mobileNumber.addEventListener("keyup", checkNumber);
var response;

let xhr = new XMLHttpRequest();

xhr.open("GET", "./nnetworks.json", true);

xhr.onload = function () {
  response = JSON.parse(this.responseText);

  addNetworks(response);
  function addNetworks(response) {
    let newArray = [];
    const newResponse = Object.values(response).forEach((nnetwork) => {
      newArray.push(nnetwork);
    });
    // let firstarray = [];
    const newww = newArray.reduce((firstarray = [], next) => {
      return firstarray.concat(next);
    });

    console.log(newww);
  }
};

xhr.send();

function checkNumber() {
  const mobileNumberValue = this.value;

  const firstFourDigits = /^[0][0-9]/.test(mobileNumberValue)
    ? Number(String(mobileNumberValue).slice(0, 5))
    : Number(String(mobileNumberValue).slice(0, 4));

  loadData(String(firstFourDigits));

  // this function was for changing the image after the user finishes typing the number and the number is valid
  // We had to change it to the above to that changes as yout type
  // if (validNumber.test(this.value)) {
  //   console.log(this.value);
  //   const entireNumber = this.value;
  //   const match = entireNumber.match(validNumber);

  //   const threeDigit = match.groups.threedigit;
  //   console.log(threeDigit);
  //   console.log(confirmNetwork(threeDigit));
  //   // ChangeLogo(confirmNetwork(Number(threeDigit)));
  // } else {
  //   // Create and call a function that display to the user that number entered is invalid
  //   console.log("Invalid Number");
  // }
}

function loadData(mobile) {
  let network;

  console.log(response);

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
      if (network != undefined) {
        network = "etisalat";
      }
    }
  });

  ChangeLogo(network);

  // console.log(network);
}

// const mobile = 702;

// loadData(String(mobile));

// console.log(response);

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
