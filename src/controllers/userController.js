const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require('dotenv').config();

// Função para obter um usuário pelo ID
const getUserById = async (req, res) => {
  const id = req.params.id;

  if (!/^[0-9a-fA-F]{24}$/.test(id)) {
    return res.status(422).json({ message: "ID do usuário inválido" });
  }

  try {
    const user = await User.findById(id, "-password");

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Função para registrar um novo usuário
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name) {
    return res.status(422).json({ message: "Nome é obrigatório" });
  }

  if (!email) {
    return res.status(422).json({ message: "Email é obrigatório" });
  }

  if (!password) {
    return res.status(422).json({ message: "Senha é obrigatória" });
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

    res.status(201).json({ message: "Usuário criado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Função para fazer login de um usuário
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(422).json({ message: "Email é obrigatório" });
  }

  if (!password) {
    return res.status(422).json({ message: "Senha é obrigatória" });
  }

  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(422).json({ message: "Usuário não encontrado" });
  }

  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    return res.status(422).json({ message: "Senha inválida" });
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
};

module.exports = {
  getUserById,
  registerUser,
  loginUser,
};