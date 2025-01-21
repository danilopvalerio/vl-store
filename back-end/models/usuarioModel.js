const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const ROLES = ["admin", "visitante", "gerente", "vendedor"];

const usuarioSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "O campo username é obrigatório"],
    },
    password: {
      type: String,
      required: [true, "O campo senha é obrigatório"],
    },
    email: {
      type: String,
      required: [true, "O campo email é obrigatório"],
      unique: [true, "Este email já está em uso"],
      match: [
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        "Por favor insira um email válido.",
      ],
    },
    phone: {
      type: String,
      required: [true, "O campo telefone é obrigatório"],
      unique: [true, "Este telefone já está em uso"],
    },
    role: {
      type: String,
      enum: ROLES,
      default: "visitante",
    },
    ativo: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Hash da senha antes de salvar
// Caso a senha seja criada a primeira vez ou tenha sido mudada, ela
// irá passar pelo processo de criptografia.
usuarioSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    return next(); // Interrompe a execução e avança.
  }
  // Caso a senha não tenha sido modificada, nada é feito.
  next(); // Continua o processo de salvar.
});

// Método para comparar senhas
usuarioSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Usuario", usuarioSchema);
