const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

//chave mestra da aplicação
const JWTSecret = "djkshahjksdajksdhasjkdhasjkdhasjkdhasjkd";

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Middleware é uma função que fica entre a requisição e a resposta
//neste caso a função auth é chamada nas requisições que ela é declarada
function auth(req, res, next) {
  // Obtém o token de autorização dos cabeçalhos da requisição
  const authToken = req.headers["authorization"];

  // Verifica se o token de autorização está definido
  if (authToken != undefined) {
    // Divide o token para retirar o Bearer
    const bearer = authToken.split(" ");
    var token = bearer[1];

    // Verifica o token usando a chave secreta JWT
    jwt.verify(token, JWTSecret, (err, data) => {
      if (err) {
        res.status(401);
        res.json({ err: "Token inválido!" });
      } else {
        //variaveis globais que recebem os atributos
        req.token = token;
        req.loggedUser = { id: data.id, email: data.email };
        req.empresa = "Programatrix";
        // Chama a próxima função na cadeia de middleware
        next();
      }
    });
  } else {
    // Se o token de autorização não estiver definido, retorna um status 401 (não autorizado) e uma mensagem de erro
    res.status(401);
    res.json({ err: "Token inválido!" });
  }
}

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
      name: "Victor Lima",
      email: "victordevtb@guiadoprogramador.com",
      password: "nodejs<3",
    },
    {
      id: 20,
      name: "Guilherme",
      email: "guigg@gmail.com",
      password: "java123",
    },
  ],
};

app.get("/games", auth, (req, res) => {
  res.statusCode = 200;
  res.json({ empresa: req.empresa, user: req.loggedUser, games: DB.games });
});

app.get("/game/:id", auth, (req, res) => {
  if (isNaN(req.params.id)) {
    res.sendStatus(400);
  } else {
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

app.post("/game", auth, (req, res) => {
  var { title, price, year } = req.body;
  DB.games.push({
    id: 2323,
    title,
    price,
    year,
  });
  res.sendStatus(200);
});

app.delete("/game/:id", auth, (req, res) => {
  if (isNaN(req.params.id)) {
    res.sendStatus(400);
  } else {
    var id = parseInt(req.params.id);
    var index = DB.games.findIndex((g) => g.id == id);

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

app.listen(8000, () => {
  console.log("API RODANDO!");
});
