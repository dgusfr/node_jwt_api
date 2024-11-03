const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
const JWT_SECRET = "djkshahjksdajksdhasjkdhasjkdhasjkdhasjkd";

const dataBase = {
  games: {
    1: { title: "Call of Duty MW", year: 2019, price: 60 },
    2: { title: "Sea of Thieves", year: 2018, price: 40 },
    3: { title: "Minecraft", year: 2012, price: 20 },
  },
  users: {
    1: { id: 1, name: "Diego", email: "diego@email.com", password: "1234" },
  },
};

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function auth(req, res, next) {
  const authToken = req.headers["authorization"];
  if (!authToken) return res.status(401).json({ error: "Token inválido!" });

  const token = authToken.split(" ")[1];
  jwt.verify(token, JWT_SECRET, (err, data) => {
    if (err) return res.status(401).json({ error: "Token inválido!" });

    req.user = { id: data.id, email: data.email };
    next();
  });
}

app.get("/games", auth, (req, res) => {
  res.status(200).json(
    Object.entries(dataBase.games).map(([id, game]) => ({
      id: parseInt(id),
      ...game,
    }))
  );
});

app.get("/game/:id", auth, (req, res) => {
  const game = dataBase.games[req.params.id];

  if (!game) {
    return res.status(404).send();
  } else {
    res.status(200).json({ id: parseInt(req.params.id), ...game });
  }
});

app.post("/game", auth, (req, res) => {
  const { title, year, price } = req.body;
  const newId = Math.max(...Object.keys(dataBase.games).map(Number)) + 1;
  dataBase.games[newId] = { title, year, price };
  res.status(201).send();
});

app.delete("/game/:id", auth, (req, res) => {
  if (!dataBase.games[req.params.id]) {
    return res.status(404).send();
  } else {
    delete dataBase.games[req.params.id];
    res.status(200).send();
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

app.post("/auth", (req, res) => {
  var { email, password } = req.body;

  if (email != undefined) {
    var user = DB.users.find((u) => u.email == email);
    if (user != undefined) {
      if (user.password == password) {
        //payload do token, sua sua chave secreta e tempo de expiração.
        jwt.sign(
          { id: user.id, email: user.email },
          JWTSecret,
          { expiresIn: "48h" },
          (err, token) => {
            //tratamento de erros:
            if (err) {
              res.status(400);
              res.json({ err: "Falha interna" });
            } else {
              res.status(200);
              res.json({ token: token });
            }
          }
        );
      } else {
        res.status(401);
        res.json({ err: "Credenciais inválidas!" });
      }
    } else {
      res.status(404);
      res.json({ err: "O E-mail enviado não existe na base de dados!" });
    }
  } else {
    res.status(400);
    res.send({ err: "O E-mail enviado é inválido" });
  }
});

app.listen(3000, () => {
  console.log("API RODANDO!");
});
