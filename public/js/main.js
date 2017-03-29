(function() {
    var search = document.getElementById('search')

    search.addEventListener('keypress', function(e){
        if(e.charCode === 13)onSearch();
        else console.log(e.charCode)
    })

    function onSearch(){
        var searchTerm = { "content": "hello"}
        var request =  new XMLHttpRequest();
        request.open('POST', '/ingredients', true)
        request.setRequestHeader('Content-Type', 'application/json')
        console.log(searchTerm)
        console.log(request)
        request.send(JSON.parse(searchTerm))
    }
})();