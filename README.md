# Kitchen Alchemy
Kitchen Alchemy is a web application designed to help users discover new recipes quickly and efficiently. This project is built using HTML, CSS, and JavaScript, and it integrates with two popular APIs to provide comprehensive recipe search functionalities.

<img width="1844" height="964" alt="kitchenal" src="https://github.com/user-attachments/assets/6ae62cb8-1484-4f4f-b09f-f4e00da1250d" />

## Project Overview

The main idea behind Recipe Finder is to offer two distinct ways to search for recipes:
- **Ingredient-Based Search**: Users can input one or more ingredients they have on hand. The application uses the Spoonacular API to fetch recipes that incorporate these ingredients, making it easier to plan meals based on what you already have in your pantry.
- **Recipe Name Search**: Users can search for recipes by name. For this, Recipe Finder utilizes the Recipe Ninja API, which returns detailed recipe information based on the recipe name entered.

## Key Features

- **Dual Search Options**: Whether you want to find recipes by ingredients or by specific recipe names, Recipe Finder covers both scenarios.
- **Responsive Design**: The project uses modern HTML and CSS practices to ensure a clean, intuitive, and responsive user interface that works well on various devices.
- **Dynamic Data Fetching**: The JavaScript code efficiently uses the fetch method to call external APIs, ensuring that recipe data is up-to-date and relevant to the user's query.
- **User-Friendly Experience**: With clear navigation and simple controls, Recipe Finder makes it easy for anyone to explore new recipes without any hassle.

## How It Works

1. **Ingredient Search**:
   - Users enter one or more ingredients.
   - A fetch request is sent to the Spoonacular API.
   - The application displays a list of recipes that match the provided ingredients, complete with images and brief descriptions.
<img width="1844" height="964" alt="foodpic" src="https://github.com/user-attachments/assets/c7887d69-ab6a-41e1-96e5-7f7b48c22d10" />

2. **Recipe Name Search**:
   - Users input a specific recipe name.
   - The Recipe Ninja API is queried using the provided name.
   - Detailed recipe information is displayed, including ingredients, preparation steps, and images.
<img width="1844" height="964" alt="byname" src="https://github.com/user-attachments/assets/ed56972f-cfff-4f9f-9a00-441642fc010d" />

## Getting Started

To set up Recipe Finder locally, follow these general steps:

1. Download the project files to your local machine.
2. Open the project folder and locate the main HTML file.
3. Use a web browser to open the HTML file directly, or run a simple local server if preferred.
4. Before using the application, configure your API keys for both Spoonacular and Recipe Ninja by creating a configuration file where the keys are stored.
5. Once configured, simply open the application in your browser, enter your search criteria, and explore the available recipes.

## Final Thoughts

Recipe Finder is a straightforward project that demonstrates how to integrate multiple APIs into a web application using basic web development technologies. It provides an excellent example of combining frontend development with real-time data fetching to create a practical and enjoyable user experience. Whether you're a cooking enthusiast or a developer looking for inspiration, Recipe Finder offers a useful platform for exploring culinary possibilities.
