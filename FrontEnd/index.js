function loadGames() {
  axios
    .get("http://localhost:8000/games")
    .then((response) => {
      var games = response.data;
      var list = document.getElementById("games");
      list.innerHTML = ""; // Limpa a lista antes de preenchê-la novamente

      games.forEach((game) => {
        var item = document.createElement("li");

        //Definind atributos personalizados, data-id no elemento <li>, que armazenam o ID do game.
        item.setAttribute("data-id", game.id);
        item.setAttribute("data-title", game.title);
        item.setAttribute("data-year", game.year);
        item.setAttribute("data-price", game.price);

        item.innerHTML = game.id + " - " + game.title + " - $" + game.price;

        var deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "Deletar";
        deleteBtn.addEventListener("click", function () {
          deleteGame(item);
        });

        var editBtn = document.createElement("button");
        editBtn.innerHTML = "Editar";
        editBtn.addEventListener("click", function () {
          loadForm(item);
        });

        //Adiciona os botões de deletar e editar ao elemento <li>.
        item.appendChild(deleteBtn);
        item.appendChild(editBtn);

        list.appendChild(item);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

document.addEventListener("DOMContentLoaded", loadGames);

var axiosConfig = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
};

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await axios.post("http://localhost:8000/auth", {
      email,
      password,
    });

    if (response.status === 200) {
      const token = response.data.token;
      localStorage.setItem("token", token);
      axiosConfig.headers.Authorization =
        "Bearer " + localStorage.getItem("token");
      alert("Login com sucesso");
    } else {
      // Tratar outros possíveis status de resposta aqui, se necessário
      alert("Erro ao fazer login");
    }
  } catch (error) {
    // Se ocorrer um erro na requisição, exiba uma mensagem de erro
    console.error("Erro ao fazer login:", error);
    alert(
      "Erro ao fazer login. Verifique sua conexão com a internet e tente novamente."
    );
  }
}

function createGame() {
  var titleInput = document.getElementById("title").value;
  var yearInput = document.getElementById("year").value;
  var priceInput = document.getElementById("price").value;

  var game = {
    title: titleInput,
    year: yearInput,
    price: priceInput,
  };

  axios
    .post("http://localhost:8000/game", game)
    .then((response) => {
      if (response.status == 200) {
        alert("Game cadastrado!");
        loadGames();
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function deleteGame(listItem) {
  var id = listItem.getAttribute("data-id");
  console.log(id);
  axios
    .delete("http://localhost:8000/game/" + id)
    .then((response) => {
      if (response.status == 200) {
        alert("Game deletado!");
        loadGames();
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function updateGame() {
  var id = document.getElementById("idEdit").value;
  var titleInput = document.getElementById("titleEdit").value;
  var yearInput = document.getElementById("yearEdit").value;
  var priceInput = document.getElementById("priceEdit").value;

  var game = {
    title: titleInput,
    year: yearInput,
    price: priceInput,
  };

  axios
    .put("http://localhost:8000/game/" + id, game)
    .then((response) => {
      if (response.status == 200) {
        alert("Game atualizado!!");
        loadGames();
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function loadForm(listItem) {
  var id = listItem.getAttribute("data-id");
  var title = listItem.getAttribute("data-title");
  var year = listItem.getAttribute("data-year");
  var price = listItem.getAttribute("data-price");

  document.getElementById("idEdit").value = id;
  document.getElementById("titleEdit").value = title;
  document.getElementById("yearEdit").value = year;
  document.getElementById("priceEdit").value = price;
}
