function startApp() {
  // Your entire app should not necessarily be coded inside this
  // single function (though there's no penalty for that),
  // so create and use/call additional functions from here
  const mobileNumber = document.querySelector(".mobile-number");

  mobileNumber.addEventListener("keyup", checkNumber);
}

function checkNumber() {
  // Regex to check if a given number is valid or not
  // In this case, A user can use both the Nigeria dialing code and zero and the program will still work will

  const validNumber = /^((\+234)|0)(?<threedigit>\d{3})\d{3}\d{4}$/;

  if (validNumber.test(this.value)) {
    // console.log(this.value);
    const entireNumber = this.value;
    const match = entireNumber.match(validNumber);
    const threeDigit = match.groups.threedigit;
    // console.log(threeDigit);
    // console.log(confirmNetwork(Number(threeDigit)));
    ChangeLogo(confirmNetwork(Number(threeDigit)));
  } else {
    // Create and call a function that display to the user that number entered is invalid
    console.log("Invalid Number");
  }
}

function confirmNetwork(threeDigit) {
  // The networks arrays are to be populated with corresponding values respectively
  const mtn = [810, 703, 813, 814],
    glo = [],
    etisalat = [],
    airtel = [];

  return glo.includes(threeDigit)
    ? "glo"
    : mtn.includes(threeDigit)
    ? "mtn"
    : etisalat.includes(threeDigit)
    ? "etisalat"
    : airtel.includes(threeDigit)
    ? "airtel"
    : null;
}

function ChangeLogo(networkName) {
  // Write code that will enable the logo image to change based on the network name
}

// ======= DO NOT EDIT ============== //
export default startApp;
// ======= EEND DO NOT EDIT ========= //
