// Llamamos a los módulos que vamos a necesitar
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Gracias a Mongoose nos conectamos a nuestra base de datos MongoDB
// no es necesario que la base de datos exista, MongoDB la creará la primera
// vez que guardemos algo en ella.
mongoose.connect('localhost:27017/gestor_tareas', function(error, res){
	if(error){
		console.log('ERROR conectando a la base de datos. ' + error);
	}
});
mongoose.Promise = require('bluebird');

// Con las siguientes líneas creamos el esquema de nuestra 'tarea'.
// Haremos algo muy sencillo, cada tarea solo llevará un nombre y una descripción
var Schema = mongoose.Schema;

var TareaSchema = new Schema({
	name: String,
	description: String
})
var Tarea = mongoose.model('Tarea',TareaSchema, 'tareas');

// Definimos espress en una variable a la que por convención suele llamarse app
var app = express();

// Configuramos app para usar bodyParser, así podremos usar los datos que lleguen al servidor por POST y PUT en el req.body
app.use(bodyParser.urlencoded({'extended':true}));

// Definimos el puerto por el que nuestro servidor va a escuchar 
const PORT = 3000;

// Vamos a recuperar todas las tareas guardadas en la base de datos con GET
app.get('/tareas',function(req, res){
	var promise = Tarea.find();
	promise.then(function(tareas){
		res.json(tareas)
	})
	.catch(function(error){
		res.send(error);
	})
});

// vamos también con GET para que devuelva una tarea concreta por su id
app.get('/tareas/:tarea_id', function(req, res){
	var promise = Tarea.findById(req.params.tarea_id);
	promise.then(function(tarea){
		res.json(tarea)
	})
	.catch(function(error){
		res.send(error);
	})
});

// Vamos a probar a guardar una tarea a través de una petición POST
app.post('/tareas', function(req, res){
	var tarea = new Tarea();
	tarea.name = req.body.name;
	tarea.description = req.body.description;

	//Guardamos la tarea y comprobamos si hay error
	var promise = tarea.save();
	promise.then(function(tarea){
		res.send('Tarea guardada con éxito en la base de datos' );
	})
	.catch(function(error){
	  	res.send(error);
	});
});

// Vamos a modificar una tarea a través de peticiones PUT
app.put('/tareas/:tarea_id',function(req, res){
	var promise = Tarea.findById(req.params.tarea_id);

	promise.then(function(tarea){
		tarea.name = req.body.name;
		tarea.description = req.body.description;
		tarea.save();
	})
	.then(function(){
		res.send('Tarea modificada correctamente');
	})
	.catch(function(error){
		res.send(error);
	})

});

// Vamos borrar tareas con las peticiones DELETE
app.delete('/tareas/:tarea_id',function(req, res){
	var promise = Tarea.findById(req.params.tarea_id);

	promise.then(function(tarea){
		tarea.remove();
	})
	.then(function(){
		res.send('Tarea eliminada correctamente');
	})
	.catch(function(error){
		res.send(error);
	})

});

// Le decimos a nuestra aplicación que escuche por el puerto que le hemos indicado
app.listen(PORT);
console.log('La magia de Node!');

