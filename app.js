// app.js

// Llamamos a los módulos que vamos a necesitar
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Añadimos el módulo de promesas Bluebird
mongoose.Promise = require('bluebird');

//Esto es el modelo de mongoose para Tarea
var Tarea = require('./app/models/tarea');

// Esto es para incluir el router de las tareas
var tareasRouter = require('./app/routes/tarea');

// Definimos espress en una variable a la que por convención suele llamarse app
var app = express();

// Configuramos app para usar bodyParser, así podremos usar los datos que lleguen al servidor por POST y PUT en el req.body
app.use(bodyParser.json());

// Le decimos a express que use las rutas de las tareas
app.use('/',tareasRouter);

// Definimos el puerto por el que nuestro servidor va a escuchar 
var port = process.env.PORT || 8080;






// Le decimos a express que use las rutas establecidas y empiece a escuchar por el puerto 8080
// siempre que haya conectado con éxito a la base de datos de Mongo
mongoose.connect('localhost:27017/gestor_tareas', function(error, res){
	if(error){
		console.log('ERROR conectando a la base de datos. ' + error);
	}

	app.listen(port);
	console.log('Magia!');

});
