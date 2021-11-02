let requestingData = false;

document.getElementById("DOMContentLoaded", searchButton());

document.getElementById("textinput").addEventListener("input", e => {
    const searchVal = e.target.value
    if(searchVal.length >=3 && requestingData == false){
        requestingData = true;
        fetch(`/api/search?q=${searchVal}&aqi=no`)
        .then(res => res.json())
        .then(data => {
            createUiSearchList(data);
            requestingData = false;
        })
        .catch(err => console.log(err))
    }
})

document.getElementById("textinput").addEventListener("keydown", e => {
    if(e.key == "Tab") document.querySelector(".lists-group").innerHTML = ""
})

function searchButton(){
    let q = document.getElementById('textinput').value
    if(q == "" || q == undefined ) q = "Jakarta"
    search(q)    
}

function search(q){
    fetch(`/api?q=${q}&aqi=no`)
    .then(res => res.json())
    .then(data => createUi(data))
    .catch(err => console.log(err))
}

function createUi(data){
    if(Object.keys(data).indexOf('error')){
        document.getElementById('region').innerText = data.location.region
        document.getElementById('name').innerText = data.location.name
        document.getElementById('tz_id').innerText = data.location.tz_id
        document.getElementById('last_updated').innerText = data.current.last_updated
        document.getElementById('icon').setAttribute('src',data.current.condition.icon)
        document.getElementById('temp_c').innerHTML = data.current.temp_c + "<small> &deg;Celcius</small>"
        document.getElementById('temp_f').innerHTML = data.current.temp_f + "<small> &deg;Fahrenheit</small>"
        document.getElementById('text').innerText = data.current.condition.text
    }else{
        document.getElementById('region').innerText = "not known"
        document.getElementById('name').innerText = "not known"
        document.getElementById('tz_id').innerText = "not known"
        document.getElementById('last_updated').innerText = "not known"
        document.getElementById('temp_c').innerHTML = "not known"
        document.getElementById('temp_f').innerHTML = "not known"
        document.getElementById('text').innerText = "not known"
    }
}

function createUiSearchList(data){
    const lists = document.querySelector('.lists-group')
    lists.innerHTML = ""
    data.forEach(kota => {
        let li = document.createElement('li')
        li.className = "list-item"
        li.innerText = kota.name
        lists.append(li)
    });
}

document.addEventListener('click', e => {
    if(e.target.className == "list-item"){
        document.getElementById('textinput').value = e.target.innerText
        document.querySelector(".lists-group").innerHTML = ""
    }else{
        document.querySelector(".lists-group").innerHTML = ""
    }
})

