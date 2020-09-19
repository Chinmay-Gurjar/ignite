const http = require("http");

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const available_languages = {
  English: "English",
  Hindi: "Hindi",
  French: "French",
};
app.use("/", router);
app.get("/", function (req, res) {
  res.render("HelloWorld", {
    message: {
      ID: "0000000000",
      msgText: "The required message will print here",
    },
  });
});
var generateId = function (len) {
  var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var id = "";
  for (var i = 0; i < len; i++) {
    id += str[Math.floor(Math.random() * str.length)];
  }
  return id;
};

router.get("/hello", function (req, res) {
  const language = req.query.language;
  var message_id = generateId(10);
  switch (language) {
    case available_languages.English:
      res.status(200).render("HelloWorld", {
        message: { ID: message_id, msgText: "Hello world" },
      });
      break;
    case available_languages.Hindi:
      res.status(200).render("HelloWorld", {
        message: { ID: message_id, msgText: "Namastey sansar" },
      });
      break;
    case available_languages.French:
      res.status(200).render("HelloWorld", {
        message: { ID: message_id, msgText: "Bonjour le monde" },
      });
      break;
    default:
      res.status(400).render("HelloWorld", {
        message: {
          ID: message_id,
          msgText: "The requested language is not supported",
        },
      });
  }
});

const server = app.listen(port, function () {
  console.log("Server listening on port number" + port);
});
