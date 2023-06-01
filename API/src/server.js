const express = require("express"); // importando o express
const app = express(); // instanciando o express
const rotasDaEmpresa = require("./routes/empresa"); // importando as rotas da empresa
const cors = require("cors"); // importando o cors

const PORT = 3333; // definindo a porta que será utilizada

app.use(express.json()); // definindo que o express irá trabalhar com json
app.use(rotasDaEmpresa); // definindo que o express irá utilizar as rotas da empresa
app.use(
  cors({
    origin: "http://localhost:5173", // Defina o domínio permitido
  })
); // definindo que o express irá utilizar o cors
app.use(express.static("public")); // definindo que o express irá utilizar a pasta public

app.listen(
  PORT,
  () => console.log(`Servidor ligado na porta  http://localhost:${PORT}`) // iniciando o servidor
);
