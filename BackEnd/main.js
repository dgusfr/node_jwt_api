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

app.put("/game/:id", auth, (req, res) => {
  const game = dataBase.games[req.params.id];
  if (!game) {
    return res.status(404).send();
  } else {
    const { title, year, price } = req.body;
    dataBase.games[req.params.id] = {
      title: title || game.title,
      year: year || game.year,
      price: price || game.price,
    };
    res.status(200).send();
  }
});

app.post("/auth", (req, res) => {
  const { email, password } = req.body;
  const user = Object.values(dataBase.users).find((u) => u.email === email);

  if (!user || user.password !== password)
    return res.status(401).json({ error: "Credenciais inválidas!" });

  jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: "48h" },
    (err, token) => {
      if (err) return res.status(500).json({ error: "Falha interna" });

      res.status(200).json({ token });
    }
  );
});

app.listen(3000, () => console.log("Server running on port 3000"));
