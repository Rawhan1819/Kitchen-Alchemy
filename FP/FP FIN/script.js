const searchInput = document.getElementById('searchInput');
const recipesList = document.getElementById('recipesList');
const modal = document.getElementById('recipeModal');
const modalContent = document.getElementById('modalContent');
const closeBtn = document.querySelector('.close-btn');

// Replace with your Recipe Ninja API key
const API_KEY = 'qYp0zwcp2QK4TpU8zLbyfg==RQALb3mTE2NeerX5';
const MEAL_DB_API = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

// Popular recipe categories with emojis
const popularCategories = [
    { name: 'Pasta', emoji: '🍝' },
    { name: 'Chicken', emoji: '🍗' },
    { name: 'Pizza', emoji: '🍕' },
    { name: 'Salad', emoji: '🥗' },
    { name: 'Soup', emoji: '🥣' },
    { name: 'Cake', emoji: '🍰' },
    { name: 'Curry', emoji: '🍛' },
    { name: 'Rice', emoji: '🍚' },
    { name: 'Fish', emoji: '🐟' },
    { name: 'Bread', emoji: '🍞' }
];

// Show loading state
function showLoading() {
    recipesList.innerHTML = `
        <div class="loading-state">
            <div class="loading-spinner"></div>
            <p>Brewing up some delicious recipes...</p>
        </div>
    `;
}

// Get recipe image from TheMealDB
async function getRecipeImage(title) {
    try {
        const response = await fetch(MEAL_DB_API + encodeURIComponent(title));
        const data = await response.json();
        return data.meals && data.meals[0]
            ? data.meals[0].strMealThumb
            : '/api/placeholder/400/320';
    } catch (error) {
        console.error('Error fetching image:', error);
        return '/api/placeholder/400/320';
    }
}

// Format instructions for better readability
function formatInstructions(instructions) {
    if (!instructions) return '<li>No instructions available.</li>';

    if (instructions.includes('|')) {
        return instructions
            .split('|')
            .map(step => `<li>${step.trim()}</li>`)
            .join('');
    }

    const steps = instructions.split(/(?<=[.!?])\s+(?=[A-Z])/);
    return steps
        .filter(step => step.trim())
        .map(step => `<li>${step.trim().replace(/"/g, '')}</li>`)
        .join('');
}

// Search recipes from Recipe Ninja API
async function searchRecipes(query) {
    if (!query.trim()) {
        showWelcomeScreen();
        return;
    }

    showLoading();

    try {
        const response = await fetch(
            'https://api.api-ninjas.com/v1/recipe?query=' + encodeURIComponent(query),
            {
                method: 'GET',
                headers: {
                    'X-Api-Key': API_KEY,
                    'Content-Type': 'application/json'
                }
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const recipes = await response.json();

        if (recipes && recipes.length > 0) {
            await displayRecipes(recipes);
        } else {
            showNoResults();
        }
    } catch (error) {
        console.error('Error fetching recipes:', error);
        showError(error.message);
    }
}

// Display recipes in the grid
async function displayRecipes(recipes) {
    recipesList.innerHTML = '';
    const fragment = document.createDocumentFragment();

    for (const recipe of recipes) {
        const imageUrl = await getRecipeImage(recipe.title);
        const recipeElement = document.createElement('div');
        recipeElement.className = 'recipe-card';
        recipeElement.innerHTML = `
            <img src="${imageUrl}" alt="${recipe.title}" class="recipe-image">
            <div class="recipe-info">
                <h3>${recipe.title}</h3>
                <p>👥 Servings: ${recipe.servings}</p>
                <p>⭐ Rating: ${(Math.random() * 2 + 3).toFixed(1)}/5</p>
            </div>
        `;

        recipeElement.addEventListener('click', () => showRecipeDetails(recipe, imageUrl));
        fragment.appendChild(recipeElement);
    }

    recipesList.appendChild(fragment);
}

// Show welcome screen with popular categories
function showWelcomeScreen() {
    recipesList.innerHTML = `
        <div class="welcome-screen">
            <h2>Welcome to Kitchen Alchemy! 🧙‍♂️</h2>
            <p>Discover magical recipes from around the world</p>
            
            <div class="popular-categories">
                <h3>Popular Categories</h3>
                <div class="category-grid">
                    ${popularCategories.map(category => `
                        <div class="category-card" onclick="searchRecipes('${category.name}')">
                            <span class="category-emoji">${category.emoji}</span>
                            <span class="category-name">${category.name}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

// Show no results message
function showNoResults() {
    recipesList.innerHTML = `
        <div class="welcome-screen">
            <h3>No recipes found 😕</h3>
            <p>Try searching for something else</p>
            
            <div class="popular-categories">
                <h3>Popular Categories</h3>
                <div class="category-grid">
                    ${popularCategories.map(category => `
                        <div class="category-card" onclick="searchRecipes('${category.name}')">
                            <span class="category-emoji">${category.emoji}</span>
                            <span class="category-name">${category.name}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

// Show error message
function showError(message) {
    recipesList.innerHTML = `
        <div class="welcome-screen">
            <h3>Oops! Something went wrong 😔</h3>
            <p>Error: ${message}</p>
            <button class="spoon-btn" onclick="searchInput.focus()">Try Again</button>
            
            <div class="popular-categories">
                <h3>Popular Categories</h3>
                <div class="category-grid">
                    ${popularCategories.map(category => `
                        <div class="category-card" onclick="searchRecipes('${category.name}')">
                            <span class="category-emoji">${category.emoji}</span>
                            <span class="category-name">${category.name}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

// Display recipe details in modal
function showRecipeDetails(recipe, imageUrl) {
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('active'), 10);

    const cookingTime = Math.floor(Math.random() * 30) + 30;
    const difficulty = ['Easy', 'Medium', 'Hard'][Math.floor(Math.random() * 3)];

    modalContent.innerHTML = `
        <img src="${imageUrl}" alt="${recipe.title}" class="recipe-detail-image">
        <h2>${recipe.title}</h2>
        
        <div class="recipe-meta">
            <p>👥 Servings: ${recipe.servings}</p>
            <p>⏱️ Cooking Time: ${cookingTime} mins</p>
            <p>📊 Difficulty: ${difficulty}</p>
        </div>

        <div class="recipe-section">
            <h3>✨ Ingredients</h3>
            <ul class="ingredients-list">
                ${recipe.ingredients.split('|').map(ing => `
                    <li>
                        <label class="ingredient-item">
                            <input type="checkbox" class="ingredient-checkbox">
                            <span>${ing.trim()}</span>
                        </label>
                    </li>
                `).join('')}
            </ul>
        </div>

        <div class="recipe-section">
            <h3>📝 Instructions</h3>
            <ol class="instructions-list">
                ${formatInstructions(recipe.instructions)}
            </ol>
        </div>

        <div class="recipe-tips">
            <h3>💡 Chef's Tips</h3>
            <ul>
                <li>Prep all ingredients before starting to cook</li>
                <li>Keep an eye on temperature control</li>
                <li>Taste and adjust seasonings as needed</li>
            </ul>
        </div>
    `;

    // Add ingredient checking functionality
    const checkboxes = modalContent.querySelectorAll('.ingredient-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            const label = this.parentElement;
            if (this.checked) {
                label.classList.add('checked');
            } else {
                label.classList.remove('checked');
            }
        });
    });
}

// Close modal
function closeModal() {
    modal.classList.remove('active');
    setTimeout(() => modal.style.display = 'none', 300);
}

// Event Listeners
closeBtn.addEventListener('click', closeModal);

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        searchRecipes(searchInput.value);
    }
});

// Initialize with welcome screen
showWelcomeScreen();

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
        closeModal();
    }
});


// Add these at the start of your JavaScript file, after the existing constants
const foodIcons = ['🍲', '🥘', '🍝', '🥗', '🍜', '🍛', '🥪', '🌮', '🍕', '🥩'];

// Add this function to get a random icon
function getRandomIcon() {
    return foodIcons[Math.floor(Math.random() * foodIcons.length)];
}

// Add this function to create and manage the preview modal
function createPreviewModal() {
    const modal = document.createElement('div');
    modal.className = 'preview-modal';
    modal.innerHTML = `
        <img src="" alt="Recipe Preview">
    `;
    document.body.appendChild(modal);

    // Close modal when clicking anywhere
    modal.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    return modal;
}

// Modify your existing displayRecipes function to include icons and preview button
async function displayRecipes(recipes) {
    recipesList.innerHTML = '';
    const fragment = document.createDocumentFragment();
    const previewModal = createPreviewModal();

    for (const recipe of recipes) {
        const imageUrl = await getRecipeImage(recipe.title);
        const recipeElement = document.createElement('div');
        recipeElement.className = 'recipe-card';

        const icon = getRandomIcon();

        recipeElement.innerHTML = `
            <div class="recipe-icon">${icon}</div>
            <img src="${imageUrl}" alt="${recipe.title}" class="recipe-image">
            <div class="recipe-info">
                <h3>${recipe.title}</h3>
                <p>👥 Servings: ${recipe.servings}</p>
                <p>⭐ Rating: ${(Math.random() * 2 + 3).toFixed(1)}/5</p>
                <button class="preview-btn">Preview Image</button>
            </div>
        `;

        // Add preview functionality
        const previewBtn = recipeElement.querySelector('.preview-btn');
        previewBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent recipe card click
            const modalImg = previewModal.querySelector('img');
            modalImg.src = imageUrl;
            previewModal.classList.add('active');
        });

        recipeElement.addEventListener('click', () => showRecipeDetails(recipe, imageUrl));
        fragment.appendChild(recipeElement);
    }

    recipesList.appendChild(fragment);
}