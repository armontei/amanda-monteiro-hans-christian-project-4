// Create app namespace to hold all methods
const app = {};

// Get input from user.
// app.collectInfo = function(){ 

// };

// Prevent default function of the form.

// Make AJAX request with user inputted data

app.getRecipes = function  (food ) {
    $.ajax({
        url: `https://www.themealdb.com/api/json/v1/1/search.php?s=${food}`,
        method: 'GET',
        dataType: 'json'
    }).then(function  (result)  {

        

    const results = result.meals;
    console.log(results);
        // console.log(result.meals);
        for (let i = 0; i < results.length; i +=1){
            console.log(results[i].strMeal, results[i].strMealThumb, results[i].strYoutube, results[i].strSource, results[i].strArea);
            
        }

        $('.recipes').append(`<h3>${results[0].strMeal}</h3>
            <img src="${results[0].strMealThumb}" alt="${results[0].strMeal}">
            <p>Origin: ${results[0].strArea}</p>
            <a href="${results[0].strSource}">Full recipe</a>
            <a href="${results[0].strYoutube}">Recipe video</a>`);

        // app.displayRecipes(result);
    })
    
    
};  

// get input from user
app.formSubmit = function(){
    $(`form`).on(`submit`, function(e){
        e.preventDefault();
        
        const userInput = $(`input:text`).val();
        // console.log(userInput);

        app.getRecipes(userInput)

        // $('.recipes').empty();
        
        // Maybe use forEach();

    })
}

app.displayRecipes = function(meals) {

    meals.forEach(meal => {
       
    })
    
}



// Lookup a single random meal:
// https://www.themealdb.com/api/json/v1/1/random.php

// if === null;

// dishName = meals.strMeal
// images = result['strMealThumb']
// tags = result['strTags']
// youtube link = result['strYoutube']
// website link = result['strSource']
// origin = result['strArea']

// Display data on the page
// app.displayRecipes = function (recipes) {

// };

// Initialize app
app.init = function () { 
    app.formSubmit();
    
};

// document ready
$(function () {
    app.init();
})

