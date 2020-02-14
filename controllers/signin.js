const handleAdminSignin = (req, res, db, bcrypt) => {
  const { username, password } = req.body;
  db.select("*")
    .from("admin")
    .where("username", "=", username)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].password);
      if (isValid) {
        res.json({ id: data[0].id, username: data[0].username });
      } else {
        res.status(400).json("Wrong credentials");
      }
    })
    .catch(err => res.status(400).json("Wrong credentials"));
};
module.exports = {
  handleAdminSignin: handleAdminSignin
};
