// app.js

// Llamamos a los módulos que vamos a necesitar
var express = require('express');
var bodyParser = require('body-parser');

// Definimos espress en una variable
var app = express();

// Configuramos app para usar bodyParser, así podremos usar los datos que nos lleguen por POST
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Definimos el puerto por el que nuestro servidor va a escuchar 
var port = process.env.PORT || 8080;

//LAS RUTAS
var router = express.Router();

// Ahora definimos cada una de las rutas para nuestros verbos

// primero GET
router.get('/', function(req, res){
	res.send('Hola desde la api de WebEnCodigo!');
});

// Le añadimos el prefijo /api a todas nuestras rutas
app.use('/api', router);

// Le decimos a express que use las rutas establecidas
app.use(router);

app.listen(port);
console.log('Magia!');