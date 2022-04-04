// YOUR API KEY https://openweathermap.org/api
const API_KEY = "";
const search = document.querySelector(".form-box");
const input = document.querySelector(".form-box input");
const error_text = document.querySelector(".error");
const list = document.querySelector(".results .cities-results");
const checkbox = document.getElementById("togBtn");
const reset = document.querySelector(".reset-button");

function unit_type(checkbox) {
  var a = [];
  if (!checkbox.checked) {
    a = new Array();
    a["unit"] = "metric";
    a["degree"] = "°C";
  } else {
    a["unit"] = "imperial";
    a["degree"] = "°F";
  }
  return a;
}

function parseQuery(input) {
  const query = input
    .split(",")
    .filter((tag) => tag.trim() !== "")
    .map((tag) => tag.trim());

  return query;
}

search.addEventListener("submit", (e) => {
  e.preventDefault();

  const search_query = parseQuery(input.value);
  const unitType = unit_type(checkbox);
  var URL = `https://api.openweathermap.org/data/2.5/weather?q=${search_query}&appid=${API_KEY}&units=${unitType["unit"]}`;

  fetch(URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Something went wrong");
    })
    .then((data) => {
      // do stuff with the data
      const { main, name, sys, weather } = data;
      const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;

      const li = document.createElement("li");
      li.classList.add("city");
      const html = `
        <h2 class="city-name" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
        </h2>
        <div class="city-temp">${Math.round(main.temp)}<sup>${
        unitType["degree"]
      }</sup></div>
        <figure>
          <img class="city-icon" src=${icon} alt=${weather[0]["main"]}>
          <figcaption>${weather[0]["description"]}</figcaption>
        </figure>
      `;
      li.innerHTML = html;
      list.appendChild(li);
    })
    .catch(() => {
      error_text.textContent = "Something Went Wrong! Please Try Again!";
      error_text.style.display = "block";
    });
  error_text.textContent = "";
  error_text.style.display = "none";
  search.reset();
  input.focus();
});

reset.addEventListener("click", (e) => {
  e.preventDefault();
  list.innerHTML = "";
  input.focus();
});

input.focus();
