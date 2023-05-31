const express = require("express"); // importando o express
const app = express(); // instanciando o express
const rotasDaEmpresa = require("./routes/empresa"); // importando as rotas da empresa

const PORT = 3333; // definindo a porta que será utilizada

app.use(express.json()); // definindo que o express irá trabalhar com json
app.use(rotasDaEmpresa); // definindo que o express irá utilizar as rotas da empresa

app.listen(
  PORT,
  () => console.log(`Servidor ligado na porta  http://localhost:${PORT}`) // iniciando o servidor
);
