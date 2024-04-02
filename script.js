let planetList;

document.addEventListener('DOMContentLoaded', (event) => {
    fetch('https://swapi.dev/api/planets')
    .then(response => response.json())
    .then(data => {
        planetList = data.results;
        console.log(planetList);
        displayPlanets(planetList);
    })
    .catch(error => {
        console.log(error);
    });
});

function displayPlanetInfo(planet) {
    let planetInfoElement = document.getElementById('planet-info');
    planetInfoElement.innerHTML = `
    <div class="info-card">
        <h1>${planet.name}</h1>
        <p>Clima: ${planet.climate}</p>
        <p>População Estimada: ${planet.population}</p>
        <p>Tipo de terreno: ${planet.terrain}</p>
    </div>
    `;

    let popup = document.getElementById('planet-info-popup');
    popup.style.display = "block";

    let span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        popup.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == popup) {
            popup.style.display = "none";
        }
    }
}

function displayPlanets(filteredPlanets) {
    let planetListElement = document.getElementById('planet-list');
    planetListElement.innerHTML = '';

    filteredPlanets.forEach(planet => {
        let planetElement = document.createElement('button');
        planetElement.classList.add('planet');
        planetElement.addEventListener('click', () => {
            displayPlanetInfo(planet);
            showResidents(planet);
        });
        planetElement.innerHTML = planet.name;
        planetListElement.appendChild(planetElement);
    });
}

function searchPlanets() {
    let searchInput = document.getElementById('search-input').value;
    let filteredPlanets = planetList.filter(planet => planet.name.toLowerCase().includes(searchInput.toLowerCase()));
    displayPlanets(filteredPlanets);
}

function showResidents(planet){
    let residents = document.getElementById('planet-residents');
    if(planet.residents.length === 0){
        residents.innerHTML = `
            <p>Nenhum residente encontrado</p>
        `;
        return;
    }
    residents.innerHTML = `
            <tr>
                <th>Nome</th>
                <th>Aniversario</th>
            </tr>
    `;
    planet.residents.forEach(resident => {
        fetch(resident)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            residents.innerHTML += `
            <tr>
                <td>${data.name}</td>
                <td>${data.birth_year}</td>
            </tr>
            `;
        }, error => {
            console.log(error);
        });
                
    })
}