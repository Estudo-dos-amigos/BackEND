const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

require('dotenv').config()

router.get("/:id", checkToken, async (req, res) => {
  const id = req.params.id;

  if (!/^[0-9a-fA-F]{24}$/.test(id)) {
    return res.status(422).json({ message: "ID do usuario invalido" });
  }

  const user = await User.findById(id, "-password");

  if (!user) {
    return res.status(404).json({ message: "Usuario não encontrado" });
  }

  res.status(200).json({ user });
});

function checkToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Acesso negado" });
  }

  try {
    const secret = process.env.SECRET;

    jwt.verify(token, secret);

    next();
  } catch (error) {
    res.status(400).json({ message: "Token invalido" });
  }
}

router.post("/auth/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name) {
    return res.status(422).json({ message: "Nome é obrigatorio" });
  }

  if (!email) {
    return res.status(422).json({ message: "Email é obrigatorio" });
  }

  if (!password) {
    return res.status(422).json({ message: "Senha é obrigatorio" });
  }

  const userExists = await User.findOne({ email: email });

  if (userExists) {
    return res.status(422).json({ message: "Email já utilizado" });
  }

  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = new User({
    name,
    email,
    password: passwordHash,
  });
  try {
    await user.save();

    res.status(201).json({ message: "Usuario criado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(422).json({ message: "Email é obrigatorio" });
  }

  if (!password) {
    return res.status(422).json({ message: "Senha é obrigatorio" });
  }

  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(422).json({ message: "Usuario nao encontrado" });
  }

  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    return res.status(422).json({ message: "Senha invalida" });
  }
  try {
    const secret = process.env.SECRET;

    const token = jwt.sign(
      {
        id: user._id,
      },
      secret
    );
    res
      .status(200)
      .json({ message: "Autenticação realizada com sucesso", token });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
module.exports = router;
