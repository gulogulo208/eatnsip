const foodSrchBtn = document.getElementById('food-btn');
const drinkSrchBtn = document.getElementById('drink-btn');
const recipeList = document.getElementById('recipe');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');
var searchInputTxt = document.getElementById('search-input').value.trim();

// event listeners
foodSrchBtn.addEventListener('click', foodrecipeList);
drinkSrchBtn.addEventListener('click', drinkrecipeList);
recipeList.addEventListener('click', getRecipe);
// recipeCloseBtn.addEventListener('click', () => {
//     recipeDetailsContent.parentElement.classList.remove('showRecipe');
// });


// Food Results Section
function foodrecipeList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class = "food-item" data-id = "${meal.idMeal}">
                        <div class = "food-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "food-name">
                            <h3>${meal.strMeal}</h3>
                            <button class ="food-recipe-btn" onclick ="getRecipe"> Get Recipe </button>
                            
                        </div>
                    </div>
                `;
            });
            recipeList.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find any meal!";
            recipeList.classList.add('notFound');
        }

        recipeList.innerHTML = html;
    });
    
    localStorage.setItem('input', searchInputTxt) // added by Theodore 2022-10-03
    localStorage.getItem(searchInputTxt);
}

// Drink Results Section

function drinkrecipeList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.drinks){
            data.drinks.forEach(drink => {
                html += `
                    <div class = "food-item" data-id = "${drink.idDrink}">
                        <div class = "food-img">
                            <img src = "${drink.strDrinkThumb}" alt = "food">
                        </div>
                        <div class = "food-name">
                            <h3>${drink.strDrink}</h3>
                            <button class ="drink-recipe-btn" onclick ="getRecipe"> Get Recipe </button>
                            
                        </div>
                    </div>
                `;
            });
            recipeList.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find any meal!";
            recipeList.classList.add('notFound');
        }

        recipeList.innerHTML = html;
    });

    localStorage.setItem('input', searchInputTxt); // This line was added by Theodore 2022-10-03
    localStorage.getItem(searchInputTxt);
}




// localStorage.setItem('search-input', document.getElementById('search-input').value);
// localStorage.getItem(document.getElementById('search-input').value);
// console.log(document.getElementById('search-input').value);







// get recipe of the meal
function getRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('food-recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => foodRecipeModal(data.meals));
    } else if(e.target.classList.contains('drink-recipe-btn')){
        let drinkItem = e.target.parentElement.parentElement;
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkItem.dataset.id}`)
        .then(response => response.json())
        .then(data => drinkRecipeModal(data.drinks));
    }
}

// create a modal
function foodRecipeModal(meal){
    meal = meal[0];
    let html = `
    <div class="form-popup" id="myForm">
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
        <button type ="button" class ="btn-cancel" onclick ="closeForm()"> Close </button>
    `;
    recipeDetailsContent.innerHTML = html;
    recipeDetailsContent.parentElement.classList.add('showRecipe');
    document.getElementById("myForm").style.display ="block";
}


// create a modal
function drinkRecipeModal(drink){
    drink = drink[0];
    let html = `
        <div class="form-popup" id="myForm">
        <h2 class = "recipe-title">${drink.strDrink}</h2>
        <p class = "recipe-category">${drink.strDrink}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${drink.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${drink.strDrinkThumb}" alt = "">
        </div>
        <button type ="button" class ="btn-cancel" onclick ="closeForm()"> Close </button>
    `;
    recipeDetailsContent.innerHTML = html;
    recipeDetailsContent.parentElement.classList.add('showRecipe');
    document.getElementById("myForm").style.display ="block";
}

function closeForm()
{
    document.getElementById("myForm").style.display ="none";
}