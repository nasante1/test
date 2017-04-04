(function () {
    var search = getId('search')
    var submitRecipeBtn = getId('newRecipeSubmit')
    var recipeForm = getId('recipeForm')

    search.addEventListener('keypress', function (e) {
        event.preventDefault();
        if (e.keyCode === 13) onSearch()
        else {
            search.value += e.key
        }
    })

    submitRecipeBtn.addEventListener('click', function(e){
        var newRecipe = {
            "name": getId('recipeName').value,
            "description": getId('description').value,
            "ingredients": [{
                "name": getId('ingredient').value,
                "amount": getId('amount').value,
                "amount_type": "tons"
            }],
            "cusine": getId('cusine').value,
            "portions": getId('portions').value,
            "instructions": getId('instructions').value
        }
        onAddRecipe(newRecipe)
    })

    function getId(id){
        return document.getElementById(id);
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
                alert(response)
            }
        }
        xhr.send(JSON.stringify(newRecipe))
    }
})();