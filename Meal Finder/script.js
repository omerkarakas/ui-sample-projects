const search = document.getElementById("search");
const submit = document.getElementById("submit");
const random = document.getElementById("random");
const mealsEl = document.getElementById("meals");
const resultHeading = document.getElementById("result-heading");
const singleMealEl = document.getElementById("single-meal");


submit.addEventListener("submit", searchMeal);
mealsEl.addEventListener("click", showSelectedMeal);
random.addEventListener("click", showRandomMeal);

function searchMeal(e) {
  e.preventDefault();

  singleMealEl.innerHTML = "";

  const term = search.value;

  if (!term.trim()) {
    alert("Please enter a search term");
    return;
  }

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`).then(res => res.json()).then(data => {

    // console.log(data);
    resultHeading.innerHTML = `<h2>Search results for "${term}" :</h2>`;
    if (data.meals === null) {
      mealsEl.innerHTML = "";
      resultHeading.innerHTML = "<p>There are no search results, Try again!</p>";
    }
    else {
      mealsEl.innerHTML = data.meals.map(meal => `
        <div class="meal">
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
          <div class="meal-info" data-mealID="${meal.idMeal}"> 
          <h3>${meal.strMeal}</h3>
          </div>
        </div>`
      ).join("");
    }
  });

  search.value = "";

}

function showSelectedMeal(e) {
  const mealInfo = e.path.find(item => {
    return item.classList?.contains("meal-info");
  });

  if (!mealInfo)
    return;

  const mealId = mealInfo.getAttribute("data-mealid");

  fetchMealById(mealId);

}

function fetchMealById(mealId) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then(response => response.json())
    .then(data => {
      //console.log(data);
      const meal = data.meals[0];

      addMealToDOM(meal);

    })
}

function addMealToDOM(meal) {
  const ingredients = [];
  for (let i = 1; i < 21; i++) {
    if (meal["strIngredient" + i]) {
      ingredients.push(meal["strIngredient" + i] + " - " + meal["strMeasure" + i]);
    }
    else
      break;
  }

  const youtubeEmbedLink = meal.strYoutube.replace("watch?v=", "embed/");

  singleMealEl.innerHTML = `
  <div class="single-meal">
    <h1>${meal.strMeal}</h1>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
    <div class="single-meal-info">
      ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
      ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
    </div>
    <div class="main">
      <p>${meal.strInstructions}</p>
      <h2>Ingredients</h2>
      <ul>
        ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
      </ul>
      ${meal.strSource ? `<p class="source"><span>Source:</span> ${meal.strSource} </p>` : ""}
      ${meal.strYoutube ?
      `<iframe width="480" height="280" src="${youtubeEmbedLink}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
      : ""}
    </div>
  </div>

  `;
}


function showRandomMeal() {
  mealsEl.innerHTML = "";
  resultHeading.innerHTML = "";

  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then(response => response.json())
    .then(data => {
      const meal = data.meals[0];
      addMealToDOM(meal);
    });
}