const express = require('express');
const cors = require('cors');
const alimentoRoutes = require('./routes/alimentoRoutes');

const app = express();
const whitelist = [
    'https://paulosouza.github.io', 
    'http://localhost:5500',        
    'http://127.0.0.1:5500'          
]; 

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions))
app.use(express.json());
app.use('/api', alimentoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
