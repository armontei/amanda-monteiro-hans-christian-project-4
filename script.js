// Create app namespace to hold all methods
const app = {};

// Collect user input
app.collectInfo = function () { 

};

// Make AJAX request with user inputted data
app.getRecipes = () => {
    $.ajax({
        url: `https://www.themealdb.com/api/json/v1/1/search.php?f=${query}`,
        method: 'GET',
        dataType: 'json',
    }).then((result) => {
        console.log('results:', result);
    })
}

// Display data on the page
app.displayInfo = function () { };

// Start app
app.init = function () { 
    app.getRecipes();
};

$(function () {
    app.init();
});

/*
Description of Project:
User inputs a letter, recipes that start with that letter will generated from an api 

MVP (Minimum Viable Product) Goals:
Display the title of recipe, the image of the meal, the category, the link/youtube video of the full recipe, origin of recipe

Stretch Goals:
Click to display full ingredient list and instructions right away to they don't have to go to an external site 
*/