import express, { Application } from "express";
import mysql from "mysql";
import cors from "cors";

const app: Application = express();
const PORT = process.env.PORT || 8081;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "test",
});
const dbUser = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "websocket-tuto",
});

app.use(cors());
app.use(express.json());

app.get("/users", (req, res) => {
  const query = "SELECT * FROM users";
  dbUser.query(query, (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/users", (req, res) => {
  const query =
    "INSERT INTO users(`user_id`,`user_name`,`user_password`) VALUES (?)";
  const values = [req.body.user_id, req.body.user_name, req.body.user_password];

  dbUser.query(query, [values], (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json("User has been created successfully");
  });
});

app.get("/books", (req, res) => {
  const query = "SELECT * FROM books";
  db.query(query, (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const query =
    "INSERT INTO books(`title_book`,`desc_book`,`cover_book`) VALUES (?)";
  const values = [req.body.title_book, req.body.desc_book, req.body.cover_book];

  db.query(query, [values], (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json("Book has been created successfully");
  });
});

app.listen(PORT, () => {
  console.log(`App is listening here 👉 http://localhost:${PORT} `);
});
