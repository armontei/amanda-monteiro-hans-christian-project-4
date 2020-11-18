// Create app namespace to hold all methods
const app = {};

// Get input from user.
app.collectInfo = function(){ 

};

// Prevent default function of the form.

// Make AJAX request with user inputted data
app.getRecipes = function(letter){
    $.ajax({
        url: `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`,
        method: 'GET',
        dataType: 'json',
    }).then(function(result){
        console.log('results:', result);
    })
}

// Display data on the page
app.displayInfo = function () {

};

// Initialize app
app.init = function () { 
    app.getRecipes(`a`);
};

// document ready
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