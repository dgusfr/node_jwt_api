const apiBaseUrl = "http://localhost:3000";
const axiosConfig = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

function checkLoginStatus() {
  const token = localStorage.getItem("token");
  if (token) {
    axiosConfig.headers.Authorization = `Bearer ${token}`;
    loadGames();
  } else {
    alert("Por favor, faça login para acessar a lista de jogos.");
  }
}

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  axios
    .post(`${apiBaseUrl}/auth`, { email, password })
    .then((res) => {
      const token = res.data.token;
      localStorage.setItem("token", token);
      axiosConfig.headers.Authorization = `Bearer ${token}`;
      loadGames();
      alert("Usuário Logado");
    })
    .catch(() => alert("Login incorreto"));
}

function createGame() {
  const game = {
    title: document.getElementById("title").value,
    year: document.getElementById("year").value,
    price: document.getElementById("price").value,
  };

  axios
    .post(`${apiBaseUrl}/game`, game, axiosConfig)
    .then((response) => {
      if (response.status === 200) {
        alert("Game cadastrado!");
        loadGames();
      }
    })
    .catch(console.log);
}

function deleteGame(gameId) {
  axios
    .delete(`${apiBaseUrl}/game/${gameId}`, axiosConfig)
    .then(() => {
      alert("Game deletado!");
      loadGames();
    })
    .catch(console.log);
}

function loadGames() {
  axios
    .get(`${apiBaseUrl}/games`, axiosConfig)
    .then((response) => {
      const games = response.data;
      const list = document.getElementById("games-list");
      list.innerHTML = "";

      games.forEach((game) => {
        const item = document.createElement("li");
        item.textContent = `${game.id} - ${game.title} - $${game.price}`;

        const deleteBtn = createButton("Deletar", () => deleteGame(game.id));
        const editBtn = createButton("Editar", () => loadForm(game));

        item.append(deleteBtn, editBtn);
        list.appendChild(item);
      });
    })
    .catch(console.log);
}

function loadForm(game) {
  document.getElementById("idEdit").value = game.id;
  document.getElementById("titleEdit").value = game.title;
  document.getElementById("yearEdit").value = game.year;
  document.getElementById("priceEdit").value = game.price;
}

function updateGame() {
  const game = {
    title: document.getElementById("titleEdit").value,
    year: document.getElementById("yearEdit").value,
    price: document.getElementById("priceEdit").value,
  };
  const gameId = document.getElementById("idEdit").value;

  axios
    .put(`${apiBaseUrl}/game/${gameId}`, game, axiosConfig)
    .then((response) => {
      if (response.status === 200) {
        alert("Game atualizado!");
        loadGames();
      }
    })
    .catch(console.log);
}

function createButton(text, onClick) {
  const button = document.createElement("button");
  button.textContent = text;
  button.addEventListener("click", onClick);
  return button;
}

function logout() {
  localStorage.removeItem("token");
  axiosConfig.headers.Authorization = "";
  document.getElementById("login-status").textContent =
    "Você foi desconectado.";
  document.getElementById("login-status").style.display = "block";
  loadGames();
}

function checkLoginStatus() {
  const token = localStorage.getItem("token");
  const loginStatus = document.getElementById("login-status");

  if (token) {
    axiosConfig.headers.Authorization = `Bearer ${token}`;
    loadGames();
    loginStatus.textContent = "Você está logado!";
    loginStatus.style.display = "block";
  } else {
    loginStatus.textContent =
      "Por favor, faça login para acessar a lista de jogos.";
    loginStatus.style.display = "block";
  }
}

window.onload = checkLoginStatus;

document.addEventListener("DOMContentLoaded", checkLoginStatus);
