const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt-nodejs");
const knex = require("knex");

//
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//
const db = knex({
  client: "postgres",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "postGress@1904???",
    database: "ticket-booking"
  }
});

//
const signin = require("./controllers/signin");

//
app.post("/registeradmin", (req, res) => {
  const { username, password } = req.body;
  const hash = bcrypt.hashSync(password);
  db("admin")
    .returning("*")
    .insert({
      username: username,
      password: hash
    })
    .then(resp => {
      res.json("added successfully");
    })
    .catch(err => res.json("An error occured"));
});

app.post("/addbus", (req, res) => {
  const { name, seats } = req.body;
  db("buses")
    .returning("*")
    .insert({
      name: name,
      seats: seats
    })
    .then(resp => {
      res.json("bus added successfully");
    })
    .catch(err => res.json("An error occured"));
});

app.post("/addroute", (req, res) => {
  const { from, to, price } = req.body;
  db("routes")
    .returning("*")
    .insert({
      from: from,
      to: to,
      price: price
    })
    .then(resp => {
      res.json("bus added successfully");
    })
    .catch(err => res.json("An error occured"));
});
app.post("/addschedule", (req, res) => {
  const {
    busid,
    noofseats,
    departdate,
    departtime,
    availseats,
    from,
    bname,
    to,
    price
  } = req.body;
  db("bus-schedules")
    .returning("*")
    .insert({
      busid,
      noofseats,
      departdate,
      departtime,
      availseats,
      from,
      bname,
      to,
      price
    })
    .then(resp => {
      res.json("Schedule added successfully");
    })
    .catch(err => res.json(err));
});

app.get("/getadmins", (req, res) => {
  db.select("*")
    .from("admin")
    .then(admins => {
      res.json(
        admins.map(admin => {
          return { id: admin.id, username: admin.username };
        })
      );
    })
    .catch(err => res.json("An error occured"));
});

app.get("/getbuses", (req, res) => {
  db.select("*")
    .from("buses")
    .then(buses => {
      res.json(buses);
    })
    .catch(err => res.json("An error occured"));
});

//
app.get("/getroutes", (req, res) => {
  db.select("*")
    .from("routes")
    .then(routes => {
      res.json(routes);
    })
    .catch(err => res.json("An error occured"));
});

app.get("/getschedules", (req, res) => {
  db.select("*")
    .from("bus-schedules")
    .then(schedules => {
      res.json(schedules);
    })
    .catch(err => res.json("An error occured"));
});

app.delete("/deleteadmin", (req, res) => {
  const { id } = req.body;
  db("admin")
    .where("id", "=", id)
    .del()
    .then(admins => {
      res.json("deleted successfully");
    })
    .catch(err => res.json("An error occured"));
});

app.delete("/deletebus", (req, res) => {
  const { id } = req.body;
  db("buses")
    .where("id", "=", id)
    .del()
    .then(buses => {
      res.json("deleted successfully");
    })
    .catch(err => res.json("An error occured"));
});

app.delete("/deleteroute", (req, res) => {
  const { id } = req.body;
  db("routes")
    .where("id", "=", id)
    .del()
    .then(route => {
      res.json("deleted successfully");
    })
    .catch(err => res.json("An error occured"));
});

app.delete("/deleteschedule", (req, res) => {
  const { id } = req.body;
  db("bus-schedules")
    .where("id", "=", id)
    .del()
    .then(schedule => {
      res.json("deleted successfully");
    })
    .catch(err => res.json("An error occured"));
});

//
app.post("/Adminsignin", (req, res) => {
  signin.handleAdminSignin(req, res, db, bcrypt);
});

//
app.get("/", (req, res) => {
  res.json("ererere");
});

//
const port = 3001;
app.listen(port, () => {
  console.log("Listening at port : " + port);
});
