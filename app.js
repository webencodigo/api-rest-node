// app.js

// Llamamos a los módulos que vamos a necesitar
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Esto es el modelo de mongoose para Tarea
var Tarea = require('./app/models/tarea');

// Definimos espress en una variable
var app = express();

// Configuramos app para usar bodyParser, así podremos usar los datos que nos lleguen por POST
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Definimos el puerto por el que nuestro servidor va a escuchar 
var port = process.env.PORT || 8080;

//LAS RUTAS
var router = express.Router();

// Creamos un middleware que se usará en todas nuestras peticiones a la API
// Muy útil para validaciones, mostrar errores antes de entrar en la API, coger
// estadísticas, etc.
router.use(function(req, res, next){
	// Aquí dentro podríamos hacer un montón de cosas
	console.log('Pasando por el middleware');
	next();
});

// Ahora definimos cada una de las rutas para nuestros verbos

// primero un GET a la raíz para ver que todo va ok
router.get('/', function(req, res){
	res.send('Hola desde la api de WebEnCodigo!');
});

// vamos con GET para que devuelva todas las tareas
router.get('/api/tareas', function(req, res){
	Tarea.find(function(error, tareas){
		if(error){
			res.send(error);
		}
		res.json(tareas);
	})
});

// vamos con GET para que devuelva una tarea concreta por su id
router.get('/api/tareas/:tarea_id', function(req, res){
	Tarea.findById(req.params.tarea_id, function(error, tarea){
		if(error){
			res.send(error);
		}
		res.json(tarea);
	});
});

// ahora con el POST para crear una tarea
router.post('/api/tareas', function(req, res){
	//res.send('Hola desde el post');
	var tarea = new Tarea();
	tarea.name = req.body.name;

	//Guardamos la tarea y comprobamos si hay error
	tarea.save(function(error){
		if(error){
			res.send(error);
		}
		res.json({ mensaje: 'Tarea creada con éxito' });
	})

});

// esto sería el PUT de tareas para modificar una tarea
router.put('/api/tareas/:tarea_id', function(req, res){
	Tarea.findById(req.params.tarea_id, function(error, tarea){
		if(error){
			res.send(error);
		}

		tarea.name = req.body.name;

		tarea.save(function(error){
			if(error){
				res.send(error);
			}
			res.json({ mensaje: 'Tarea modificada con éxito' });
		});

	});
});

// y por último el verbo DELETE de tareas para borrar una concreta
router.delete('/api/tareas/:tarea_id', function(req, res){
	Tarea.findById(req.params.tarea_id, function(error, tarea){
		if(error){
			res.send(error);
		}
		tarea.remove(function(error){
			if(error){
				res.send(error);
			}
			res.json({ mensaje: 'Tarea eliminada con éxito' })
		})
	})
});

// Le añadimos el prefijo /api a todas nuestras rutas
router.use('/api', router);

// Le decimos a express que use las rutas establecidas y empiece a escuchar por el puerto 8080
// siempre que haya conectado con éxito a la base de datos de Mongo
mongoose.connect('localhost:27017/tareas', function(error, res){
	if(error){
		console.log('ERROR conectando a la base de datos. ' + error);
	}
	
	app.use(router);

	app.listen(port);
	console.log('Magia!');

});
