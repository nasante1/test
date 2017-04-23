(function () {
    function getId(id) {
        return document.getElementById(id);
    }

    var search = getId('search')
    var submitRecipeBtn = getId('newRecipeSubmit')
    var recipeForm = getId('recipeForm')
    var addRecipeBtn = getId('newRecipeAdd')
    var addIngredientBtn = getId('add-ingredient')
    var ingredientsList = getId('ingredients-list')

    submitRecipeBtn.addEventListener('click', function (e) {
        var newRecipe = {
            "name": getId('recipeName').value,
            "description": getId('description').value,
            "cusine": getId('cusine').value,
            "ingredients": [],
            "portions": getId('portions').value,
            "instructions": getId('instructions').value
        }

        var ingredient = {}
        for(var i=0; i<ingredientsList.childElementCount; i++){
            var item = ingredientsList.children[i].innerText.replace(/^delete/,'')
            ingredient.name = item.split('-')[0]
            ingredient.quantity = item.split('-')[1].split(' ')[0]
            ingredient.unit = item.split('-')[1].split(' ')[1]
            newRecipe.ingredients.push(ingredient)
        }
        onAddRecipe(newRecipe)
    })

    addIngredientBtn.addEventListener('click', function (e) {
        addIngredient(getId('ingredient').value, getId('quantity').value, getId('unit').value)
    })

    ingredientsList.addEventListener('click', function(e){
        if(e.target.innerText === 'delete') e.target.parentElement.remove()
    })

    function addIngredient(ingredient, quantity, unit) {
        var newIngre = document.createElement('li')
        var badge = document.createElement('span')
        badge.innerText = "delete"
        badge.className = "badge"
        newIngre.appendChild(badge)
        newIngre.innerHTML += ingredient + "-" + quantity + " " + unit;
        newIngre.className = "list-group-item"
        getId('ingredients-list').appendChild(newIngre)
    }

    function onSearch() {
        var searchTerm = { "ingredient": search.value }
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:3000/ingredients', true)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var response = JSON.parse(xhr.responseText);
                console.log(response)
            }
        }
        xhr.send(JSON.stringify(searchTerm))
    }

    function onAddRecipe(newRecipe) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:3000/new', true)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var response = JSON.parse(xhr.responseText);
                console.log(response)
            }
        }
        xhr.send(JSON.stringify(newRecipe))
    }

    search.addEventListener('keypress', function (e) {
        event.preventDefault();
        if (e.keyCode === 13) onSearch()
        else {
            search.value += e.key
        }
    })
})();