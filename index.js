const express = require('express');
const app = express();
const PORT = 3070;
const { dbConnection } = require('./config/config');
const taskRoutes = require('./routes/tasks');

app.use(express.json());

app.use('/', taskRoutes);
// app.get('/prueba', (req, res) => {
//     console.log('Solicitud GET recibida en la ruta /prueba');
//     res.send('Servidor funcionando correctamente');
// });


dbConnection();

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));