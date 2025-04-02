let offset = 0;
const limit = 12;
const characterGrid = document.getElementById("characterGrid");
const btnProximo = document.getElementById("btnProximo");
console.log(characterGrid);

async function carregarPersonagens() {
  characterGrid.innerHTML = "";
  const url = `https://akabab.github.io/starwars-api/api/all.json`;
  const response = await fetch(url);
  const data = await response.json();
  const startIndex = offset;
  const endIndex = Math.min(offset + limit, data.length);

  if (endIndex >= data.length) {
    btnProximo.disabled = true;
  } else {
    btnProximo.disabled = false;
  }

  for (let i = startIndex; i < endIndex; i++) {
    const personagem = data[i];
    const personagemCard = document.createElement("div");
    personagemCard.className = "col-md-3 character-card";
    personagemCard.innerHTML = `
        <div class="carde">
          <img class="character-image" src="${personagem.image}" alt="Imagem de ${personagem.name}">
          <div class="card-body">
            <h5 class="card-title">${personagem.name}</h5>
            <p class="card-text">Altura: ${personagem.height}m</p>
            <p class="card-text">Espécie: ${personagem.species}</p>
            <p class="card-text">Cor do cabelo: ${personagem.hairColor}</p>
            <p class="card-text">Cor dos olhos: ${personagem.eyeColor}</p>
            <p class="card-text">Mestre: ${personagem.masters}</p>
            <a href="#" class="btn btn-primaryy">Ver detalhes</a>
          </div>
        </div>
      `;
    characterGrid.appendChild(personagemCard);
  }
}

document.getElementById("btnAnterior").addEventListener("click", () => {
  mudarPagina(-1);
});

document.getElementById("btnProximo").addEventListener("click", () => {
  mudarPagina(1);
});

function mudarPagina(direcao) {
  console.log("offset ", offset);
  console.log("direcao", direcao);
  console.log("limit", limit);
  if (offset + direcao * limit >= 0) {
    offset += direcao * limit;
    console.log("Novo offset", offset);
    carregarPersonagens();
  }
}

carregarPersonagens();
