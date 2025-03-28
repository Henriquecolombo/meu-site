let offset = 0;
const limit = 8;
const characterGrid = document.getElementById("characterGrid");
characterGrid.className = "character-grid";
let nextPageUrl = null;
let characterData = [];

async function carregarImagensPersonagens() {
    const response = await fetch(
        "https://akabab.github.io/starwars-api/api/all.json"
    );
    characterData = await response.json();
    console.log(characterData);
}

async function carregarPersonagensSW() {
    console.log("Página " + (offset / limit + 1));
    characterGrid.innerHTML = "";

    const url = `https://swapi.dev/api/people/?page=${offset / limit + 1}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.results);

    nextPageUrl = data.next;

    data.results.forEach((personagem) => {
        console.log(personagem);
        const personagemCard = criarPersonagemCard(personagem);
        console.log(personagemCard);
        characterGrid.appendChild(personagemCard);
    });
}

function criarPersonagemCard(personagem) {
    const personagemCard = document.createElement("div");
    personagemCard.className = "col-md-3 col-sm-6";

    const personagemEncontrado = characterData.find(
        (p) => p.name.toLowerCase() === personagem.name.toLowerCase()
    );
    const imgUrl = personagemEncontrado ?
        personagemEncontrado.image :
        "https://via.placeholder.com/150";

    personagemCard.innerHTML = `
        <div class="card personagem-card p-3 m-1">
            <img class="card-img-top character-image mx-auto" src="${imgUrl}" alt="${personagem.name}">
            <h5 class="mt-2 text-center font1">${personagem.name}</h5>
            <p><b class="legf2">Altura:</b> <b class="legf3">${personagem.height} cm</b></p>
            <p><b class="legf2">Peso:</b> <b class="legf3">${personagem.mass} kg</b></p>
            <p><b class="legf2">Gênero:</b> <b class="legf3">${personagem.gender}</b></p>
            <p><b class="legf2">Idade:</b> <b class="legf3">${personagem.birth_year}</b></p>
            <a href="#" class="btn btn-outline-warning font1">Ver detalhes</a>    
        </div>
    `;
    return personagemCard;
}

document.getElementById("btnAnterior").addEventListener("click", () => {
    console.log("Anterior");
    mudarPagina(-1);
});

document.getElementById("btnProximo").addEventListener("click", () => {
    console.log("Próximo");
    if (nextPageUrl) {
        mudarPagina(1);
    } else {
        console.log("Última página, voltando para a primeira");
        offset = 0;
        carregarPersonagensSW();
    }
});

function mudarPagina(direcao) {
    console.log("Página atual", offset / limit + 1);
    console.log("Direção", direcao);

    if (offset + direcao * limit >= 0) {
        offset += direcao * limit;
        console.log("Nova página", offset / limit + 1);
        carregarPersonagensSW();
    }
}

carregarImagensPersonagens().then(() => {
    carregarPersonagensSW();
});