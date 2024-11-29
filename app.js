window.addEventListener('scroll', () => {
    const navbar = document.getElementsByClassName('navBar')[0];
    if (window.scrollY > 500) {
        navbar.style.backgroundColor = 'rgba(183, 95, 13, 0.8)';
    } else {
        navbar.style.backgroundColor = 'rgba(183, 95, 13, 0)';
    }
});

let currentRecipeCount = 6; // Initialize with 6 recipes
let allRecipes = []; // To store all fetched recipes

document.getElementById('search-btn').addEventListener('click', async () => {
    const ingredientInput = document.getElementById('ingredient-input').value.trim();
    const cuisineFilter = document.getElementById('cuisine-filter').value;
    const dietFilter = document.getElementById('diet-filter').value;

    if (!ingredientInput) {
        alert('Please enter at least one ingredient.');
        return;
    }

    const apiKey = '27a558d73b5e4359a670638f49e9b9ea';
    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&includeIngredients=${ingredientInput}&cuisine=${cuisineFilter}&diet=${dietFilter}&addRecipeInformation=true&number=50`; // Fetch up to 50 recipes

    const resultsContainer = document.getElementById('recipe-results');
    resultsContainer.innerHTML = '<p>Loading...</p>';

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        allRecipes = data.results; // Store all recipes
        currentRecipeCount = 6; // Reset count
        displayRecipes(allRecipes.slice(0, currentRecipeCount));
    } catch (error) {
        console.error('Error fetching recipes:', error);
        resultsContainer.innerHTML = `<p>Error fetching recipes: ${error.message}</p>`;
    }
});

function displayRecipes(recipes) {
    const resultsContainer = document.getElementById('recipe-results');
    resultsContainer.innerHTML = '';

    if (recipes.length === 0) {
        resultsContainer.innerHTML = '<p>No recipes found.</p>';
        return;
    }

    recipes.forEach((recipe) => {
        const card = document.createElement('div');
        card.classList.add('recipe-card');
        card.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}">
            <h3>${recipe.title}</h3>
            <button onclick="fetchRecipeDetails(${recipe.id})">View Recipe</button>
        `;
        resultsContainer.appendChild(card);
    });

    const showMoreButton = document.getElementById('show-more-btn');
    showMoreButton.style.display = recipes.length < allRecipes.length ? 'block' : 'none';
}

document.getElementById('show-more-btn').addEventListener('click', () => {
    currentRecipeCount += 6; // Increment by 6
    displayRecipes(allRecipes.slice(0, currentRecipeCount)); // Display updated list
});


async function fetchRecipeDetails(recipeId) {
    const apiKey = '27a558d73b5e4359a670638f49e9b9ea';
    const recipeUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;

    try {
        const response = await fetch(recipeUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const recipe = await response.json();
        displayRecipeDetails(recipe);
    } catch (error) {
        console.error('Error fetching recipe details:', error);
    }
}

function displayRecipeDetails(recipe) {
    const modal = document.getElementById('recipe-modal');
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-btn" onclick="closeModal()">&#10006;</span>
            <h2>${recipe.title}</h2>
            <img src="${recipe.image}" alt="${recipe.title}" />
            <h3>Ingredients:</h3>
            <ul>
                ${recipe.extendedIngredients.map((ing) => `<li>${ing.original}</li>`).join('')}
            </ul>
            <h3>Instructions:</h3>
            <p>${recipe.instructions || "No instructions available."}</p>
        </div>
    `;
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('recipe-modal').style.display = 'none';
}