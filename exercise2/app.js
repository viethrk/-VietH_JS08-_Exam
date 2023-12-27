// 8082
const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// get danh sach todo
app.get("/api/v1/todos", (req, res) => {
  const jsonString = fs.readFileSync(path.join(__dirname, "./data/todos.json")); // => string
  const jsonData = JSON.parse(jsonString); // => json
  res.status(200).json(jsonData);
});

// get todo theo id
app.get("/api/v1/todos/:id", (req, res) => {
  const jsonString = fs.readFileSync(path.join(__dirname, "./data/todos.json")); // => string
  const jsonData = JSON.parse(jsonString); // => json
  const todo = jsonData.find((t) => t.id == req.params.id);
  res.status(200).json(todo);
});

// tao moi todo
app.post("/api/v1/todos", (req, res) => {
  const jsonString = fs.readFileSync(path.join(__dirname, "./data/todos.json")); // => string
  const jsonData = JSON.parse(jsonString); // => json

  const { userId, title, completed } = req.body;

  const dataCreate = {
    userId,
    title,
    completed,
    id: jsonData[jsonData.length - 1].id + 1,
  };

  jsonData.push(dataCreate);

  fs.writeFileSync(
    path.join(__dirname, "./data/todos.json"),
    JSON.stringify(jsonData, null, 2),
    { encoding: "utf-8" }
  );
  res.status(200).json(dataCreate);
});

// cap nhat todo
app.put("/api/v1/todos/:id", (req, res) => {
  const jsonString = fs.readFileSync(path.join(__dirname, "./data/todos.json")); // => string
  const jsonData = JSON.parse(jsonString); // => json

  const { userId, title, completed } = req.body;

  const listAfterUpdate = jsonData.map((data) => {
    if (data.id == req.params.id) {
      data.userId = userId;
      data.title = title;
      data.completed = completed;
    }

    return data;
  });

  fs.writeFileSync(
    path.join(__dirname, "./data/todos.json"),
    JSON.stringify(listAfterUpdate, null, 2),
    { encoding: "utf-8" }
  );
  res.status(200).json(req.body);
});

// xoa todo theo id

app.listen(8082, () => {
  console.log("Server is running at port 8082");
});
