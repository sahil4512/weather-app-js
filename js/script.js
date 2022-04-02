const search = document.getElementById("weather-search");
const sbutton = document.getElementById("search");

// sbutton.addEventListener("click", (e) => {

// });

getData();

async function getData() {
  const res = await fetch("https://randomuser.me/api?results=50");

  const { results } = await res.json();

  console.log(results);
}

search.addEventListener("keyup", (e) => {
  e.preventDefault();
  searchquery(e.target.value);
});

function searchquery(input) {
  const search_query = input
    .split(" ")
    .filter((tag) => tag.trim() !== "")
    .map((tag) => tag.trim());

  console.log(search_query);
}
