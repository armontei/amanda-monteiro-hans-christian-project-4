// Create app namespace to hold all methods
const app = {};

app.displayRecipes = function (dishes) {

    if (dishes === null) {
        alert(`Nothing found, try something else!`);
    } else {
        $('.hidden').show();

        $('html').animate({
            scrollTop: $('main').offset().top
        }, 1000);
    }

    // Display user input results on page.
    dishes.forEach(function (dish) {
        const displayOnPage = `
        <ul class="recipesContainer">
            <li class="${dish.strArea} countryToggle" value="${dish.strArea}">
                <h3>${dish.strMeal}</h3>
                <img src="${dish.strMealThumb}" alt="${dish.strMeal}">
                <a href="${dish.strSource}" target="_blank">Full Recipe</a>
                <a href="${dish.strYoutube}" target="_blank">YouTube</a>
                <p>Country of origin: ${dish.strArea}</p>
            </li>
        </ul>
        `
        $(`.recipes`).append(displayOnPage);

        // adding each country to a button that the user can filter recipes by
        $(`.recipeFilter`).append(`<li><button>${dish.strArea}</button></li>`);

        // removing duplicate buttons, inspo code from https://stackoverflow.com/questions/14940237/faster-jquery-code-for-duplicate-list-item-removal
        let duplicate = {};

        $(`button`).each(function () {
            let buttonText = $(this).text();
            if (duplicate[buttonText])
                $(this).remove();
            else
                duplicate[buttonText] = true;
        });
        return false;
    })
}

// Make AJAX request with user inputted data
app.getRecipes = function (food) {
    $.ajax({
        url: `https://www.themealdb.com/api/json/v1/1/search.php?s=${food}`,
        method: 'GET',
        dataType: 'json',
    }).then(function (result) {

        //Store results in a variable for reuse. 
        const results = result.meals;

        app.displayRecipes(results);
    })
};

// get input from user
app.formSubmit = function () {
    $(`form`).on(`submit`, function (e) {

        // Prevent default function of the form.
        e.preventDefault();

        const userInput = $(`input:text`).val();

        // Clear results before displaying new ones.
        $('.recipes').empty();
        $('.recipeFilter').empty();

        app.getRecipes(userInput);

    
    
    })
}

// Filter by country origin
app.filterCountries = function() {
    $('button').on('click', function() {
        let country = $(this).val();
        $('.countryToggle').hide();
        $('.countryToggle').toggleClass(country)
    })
}

// Initialize app
app.init = function () {
    app.formSubmit();
};

// document ready
$(function () {
    app.init();
})

