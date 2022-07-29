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

  const mobileNumberValue = this.value;

  const firstFourDigits = /^[0][0-9]/.test(mobileNumberValue)
    ? Number(String(mobileNumberValue).slice(0, 5))
    : Number(String(mobileNumberValue).slice(0, 4));
  console.log(firstFourDigits);
  const myNetwork = confirmNetwork(Number(firstFourDigits));
  ChangeLogo(myNetwork);

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

function confirmNetwork(threeDigit) {
  // You can change the name of the variable passsed to this function 👆🏼

  // The networks arrays are to be populated with corresponding values respectively
  // Use Regex to enable this function match the threedigit number with the numbers in the array
  // The four digit of mtn inclusive.

  // Now, for this case, will'll be  using four digit instead of the initial three digit to match all case

  // The problem with using four digits with this particular approach is the fact that any number can come after the three digit and that becomes a problem for this approach.

  // So, with regex, I believe we can check for both three digit and four digits

  // Generally, what this function should return is the name of the network that the number matched the four digit

  // you can these numbers and delete the code afterwards
  const mtn = [
      803, 806, 903, 706, 816, 906, 913, 704, 810, 703, 813, 814, 7025, 7026,
    ],
    glo = [815, 805, 811, 705, 807, 915],
    etisalat = [809, 909, 817, 818, 908],
    airtel = [702, 802, 808, 701, 901, 907, 812, 902];

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
