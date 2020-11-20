// Create app namespace to hold all methods.
const app = {};

// Display user input results on page.
app.displayRecipes = function (dishes) {

    if (dishes === null) {
        alert(`Nothing found, try something else!`);
    } else {
        $('.hidden').show();

        $('html').animate({
            scrollTop: $('main').offset().top
        }, 1000);
    }

    dishes.forEach(function (dish) {
        const displayOnPage = `
        <ul class="recipesContainer ${dish.strArea}">
            <li>
                <h4>${dish.strMeal}</h4>
                <img src="${dish.strMealThumb}" alt="${dish.strMeal}">
                <a href="${dish.strSource}" target="_blank"><i class="fas fa-book-reader"></i>Full Recipe</a>
                <a href="${dish.strYoutube}" target="_blank"><i class="fab fa-youtube"></i>YouTube</a>
                <p>Country of origin: ${dish.strArea}</p>
            </li>
        </ul>
        `
        $(`.recipes`).append(displayOnPage);

        

        // adding each country to a button that the user can filter recipes by.
        $(`.recipeFilter`).append(`<li><button class="filterButton" value="${dish.strArea}">${dish.strArea}</button></li>`);

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

// Make AJAX request with user input data.
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

// get input from user.
app.formSubmit = function () {
    $(`form`).on(`submit`, function (e) {

        // Prevent default function of the form.
        e.preventDefault();

        const userInput = $(`input:text`).val();

        // Clear results before displaying new ones.
        $('.recipes').empty();
        $('.recipeFilter').empty();
        $(`h3 span`).empty();

        app.getRecipes(userInput);
        // changing title of results
        $(`h3 span`).append(userInput);
    })
}

// filter recipes by country of origin when button is clicked
app.filterRecipes = function () {
    $(`.recipeFilter`).on(`click`, `button`, function () {
        let country = $(this).val();
        $('.recipesContainer').hide();
        $('.' + country).show();
    });
}

// Initialize app.
app.init = function () {
    app.formSubmit();
    app.filterRecipes();
};

// document ready.
$(function () {
    app.init();
})

