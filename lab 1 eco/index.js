// Api 1: Facts
  document.getElementById("fetch-button").addEventListener("click", fetchData);

  async function fetchData() {
    renderLoadingState('cats-container');
    try {
      const response = await fetch("https://catfact.ninja/fact");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      renderCatData(data);
    } catch (error) {
      renderErrorState('cats-container');
    }
  }

  function renderErrorState(containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ""; 
    container.innerHTML = "<p>Failed to load data</p>";
    console.log("Failed to load data");
  }

  function renderLoadingState(containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ""; 
    container.innerHTML = "<p>Loading...</p>";
    console.log("Loading...");
  }

  function renderCatData(data) {
    const container = document.getElementById('cats-container');
    container.innerHTML = ""; 
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `<p>${data.fact}</p>`;
    container.appendChild(div);
  }

  // Api 2: Users
  document.getElementById("user-button").addEventListener("click", userData);

  async function userData() {
    renderLoadingState('users-container');
    try {
      const response = await fetch("https://randomuser.me/api/");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const user = data.results[0]; 
      renderUserData(user);
    } catch (error) {
      renderErrorState('users-container');
    }
  }

  function renderUserData(user) {
    const container = document.getElementById('users-container');
    container.innerHTML = ""; 

    const div = document.createElement("div");
    div.className = "item";

  
    div.innerHTML = `<img src="${user.picture.large}" alt="User Image">`;
    container.appendChild(div);
  }

//Api 3: Anime 

document.getElementById("search-button").addEventListener("click", searchAnime);
document.getElementById("clear-button").addEventListener("click", clearAnime);

async function searchAnime() {
    const limit = document.getElementById("anime-limit").value;
    const search = document.getElementById("anime-search").value;
    const type = document.getElementById("anime-type").value;

    renderLoadingState('anime-container');
    try {
        const response = await fetch(`https://api.jikan.moe/v4/anime?q=${search}&type=${type}&limit=${limit}`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        renderAnimeData(data.data);
    } catch (error) {
        renderErrorState('anime-container');
    }
}

function renderAnimeData(animes) {
    const container = document.getElementById('anime-container');
    container.innerHTML = "";
    animes.forEach(anime => {
        const div = document.createElement("div");
        div.className = "item";
        div.innerHTML = `
            <h3>${anime.title}</h3>
            <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
            <p>Type: ${anime.type}</p>
        `;
        container.appendChild(div);
    });
}

function clearAnime() {
    document.getElementById('anime-container').innerHTML = "";
}


