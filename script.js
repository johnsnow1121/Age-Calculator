const years_inputs = document.getElementById("years-input");
const months_inputs = document.getElementById("months-input");
const days_inputs = document.getElementById("days-input");

const years_result = document.getElementById("years-result");
const months_result = document.getElementById("months-result");
const days_result = document.getElementById("days-result");

const btnSubmit = document.getElementById("btn");

btnSubmit.addEventListener("click", () => {
  const dayvalue = days_inputs.value;
  const monthvalue = months_inputs.value;
  const yearvalue = years_inputs.value;

  let isValid = true;
  storeData(dayvalue, monthvalue, yearvalue);

  if (dayvalue === "") {
    setError(days_inputs, "This field is required");
    isValid = false;
  } else if (dayvalue >= 32) {
    setError(days_inputs, "Write btw 0 to 31");
    isValid = false;
  } else {
    setSuccsess(days_inputs);
  }

  if (monthvalue === "") {
    setError(months_inputs, "This field is required");
    isValid = false;
  } else if (monthvalue >= 13) {
    setError(months_inputs, "Write btw 0 to 12");
    isValid = false;
  } else {
    setSuccsess(months_inputs);
  }

  const today = new Date();
  if (yearvalue === "") {
    setError(years_inputs, "This field is required");
    isValid = false;
  } else if (yearvalue >= today.getFullYear()) {
    setError(years_inputs, "Must be in the past");
    isValid = false;
  } else {
    setSuccsess(years_inputs);
  }

  if (isValid) {
    Calculate(yearvalue, monthvalue, dayvalue);
  }
});

const Calculate = (yearvalue, monthvalue, dayvalue) => {
  const birthdate = new Date(yearvalue, monthvalue - 1, dayvalue);
  const today = new Date();

  const difference = today - birthdate;

  const secondsInYear = 31536000;
  const secondsInMonth = 2592000;
  const secondsInDay = 86400;

  const years = Math.floor(difference / (1000 * secondsInYear));
  const months = Math.floor(
    (difference % (1000 * secondsInYear)) / (1000 * secondsInMonth)
  );
  const days = Math.floor(
    (difference % (1000 * secondsInMonth)) / (1000 * secondsInDay)
  );
  const formateTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  years_result.innerText = formateTime(years);
  months_result.innerText = formateTime(months);
  days_result.innerText = formateTime(days);
};

const data = [];
const storeData = (day, month, year) => {
  data.push({
    day,
    month,
    year,
  });
};

const setError = (input, msg) => {
  const field = input.parentElement;
  const small = field.querySelector("small");
  const inputField = field.querySelector("input");
  const label = field.querySelector("label");
  small.innerText = msg;
  field.classList.add("error");
  inputField.classList.add("error");
  label.classList.add("error");
};

const setSuccsess = (input) => {
  const field = input.parentElement;
  const inputField = field.querySelector("input");
  const label = field.querySelector("label");
  field.classList.remove("error");
  inputField.classList.remove("error");
  label.classList.remove("error");
};
