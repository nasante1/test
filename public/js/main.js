(function () {
    var search = document.getElementById('search')

    search.addEventListener('keypress', function (e) {
        event.preventDefault();
        if (e.keyCode === 13) onSearch()
        else {
            search.value += e.key
        }
    })

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
})();