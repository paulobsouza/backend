const express = require("express");
const cors = require("cors");
const alimentoRoutes = require("./routes/alimentoRoutes");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/api", alimentoRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
