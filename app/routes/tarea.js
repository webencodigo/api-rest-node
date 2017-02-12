// app/routes/tarea.js

var express = require('express');
//Esto es el modelo de mongoose para Tarea
var Tarea = require('../models/tarea');

var router = express.Router();

// Vamos a recuperar todas las tareas guardadas en la base de datos con GET
router.get('/api/tareas',function(req, res){
	var promise = Tarea.find();
	promise.then(function(tareas){
		res.json(tareas)
	})
	.catch(function(error){
		res.send(error);
	})
});

// Vamos también con GET para que devuelva una tarea concreta por su id
router.get('/api/tareas/:tarea_id', function(req, res){
	var promise = Tarea.findById(req.params.tarea_id);
	promise.then(function(tarea){
		res.json(tarea)
	})
	.catch(function(error){
		res.send(error);
	})
});

// Vamos a probar a guardar una tarea a través de una petición POST
router.post('/api/tareas', function(req, res){
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
router.put('/api/tareas/:tarea_id',function(req, res){
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
router.delete('/api/tareas/:tarea_id',function(req, res){
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

module.exports = router;