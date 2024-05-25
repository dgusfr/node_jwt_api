const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

var DB = {
  games: [
    {
      id: 23,
      title: "Call of duty MW",
      year: 2019,
      price: 60,
    },
    {
      id: 65,
      title: "Sea of thieves",
      year: 2018,
      price: 40,
    },
    {
      id: 2,
      title: "Minecraft",
      year: 2012,
      price: 20,
    },
  ],
  users: [
    {
      id: 1,
      nome: "Diego",
      email: "diego@email.com",
      password: "1234",
    },
    {
      id: 2,
      nome: "Ana",
      email: "ana@email.com",
      password: "5678",
    },
    {
      id: 3,
      nome: "Pedro",
      email: "pedro@email.com",
      password: "abcd",
    },
    {
      id: 4,
      nome: "Maria",
      email: "maria@email.com",
      password: "efgh",
    },
    {
      id: 5,
      nome: "Lucas",
      email: "lucas@email.com",
      password: "ijkl",
    },
  ],
};

app.post("/auth", (req, res) => {
  var { email, password } = req.bory;
  if (email != undefined) {
    DB.users.find((u) => u.email == email);
    if (users == undefined) {
      if (user.password == password) {
        res.status = 200;
        res.json({ token: "Token falso" });
      } else {
        res.status = 401;
        res.json({ err: "Senha incorreta" });
      }
    } else {
      res.status = 404;
      res.json({ err: "Email não cadastrado" });
    }
  } else {
    res.status = 400;
    res.json({ err: "Email inválido." });
  }
});

app.get("/games", (req, res) => {
  res.statusCode = 200;
  res.json(DB.games);
});

app.get("/game/:id", (req, res) => {
  // Verifica se o parâmetro 'id' passado na URL é um número
  if (isNaN(req.params.id)) {
    res.sendStatus(400);
  } else {
    // Converte o parâmetro 'id' para um número inteiro
    var id = parseInt(req.params.id);

    var game = DB.games.find((g) => g.id == id);

    if (game != undefined) {
      res.statusCode = 200;
      res.json(game);
    } else {
      res.sendStatus(404);
    }
  }
});

app.post("/game", (req, res) => {
  var { title, price, year } = req.body;
  DB.games.push({
    id: 2323,
    title,
    price,
    year,
  });
  res.sendStatus(200);
});

app.delete("/game/:id", (req, res) => {
  if (isNaN(req.params.id)) {
    res.sendStatus(400);
  } else {
    var id = parseInt(req.params.id);
    var index = DB.games.findIndex((g) => g.id == id);

    //Se o index não passou na validação anterior...
    if (index == -1) {
      res.sendStatus(404);
    } else {
      DB.games.splice(index, 1);
      res.sendStatus(200);
    }
  }
});

app.put("/game/:id", (req, res) => {
  if (isNaN(req.params.id)) {
    res.sendStatus(400);
  } else {
    var id = parseInt(req.params.id);

    var game = DB.games.find((g) => g.id == id);

    if (game != undefined) {
      var { title, price, year } = req.body;

      if (title != undefined) {
        game.title = title;
      }

      if (price != undefined) {
        game.price = price;
      }

      if (year != undefined) {
        game.year = year;
      }

      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  }
});

app.listen(8000, () => {
  console.log("API RODANDO!");
});
