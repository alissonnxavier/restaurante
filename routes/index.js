const conn = require('./../inc/db');
var express = require('express');
var app = express();
var router = express.Router();
var menus = require('./../inc/menus');
var reservations = require('./../inc/revervations');
var contacts = require('./../inc/contacts');

/* GET home page. */
router.get('/', function (req, res, next) {

  menus.getMenus().then(results => {

    res.render('index', {
      title: 'Restaurante Saboroso',
      menus: results
    });
  })

});

router.get('/contacts', (req, res, next) => {

  contacts.render(req, res);
});

router.post('/contacts', (req, res, next) => {

  if (!req.body.name) {
    contacts.render(req, res, 'Insira o nome');
  } else if (!req.body.email) {
    contacts.render(req, res, 'Insira o email');
  } else if (!req.body.message) {
    contacts.render(req, res, 'Insira a menssagem')
  } else {

    contacts.save(req.body).then(results => {

      req.body = {};

      contacts.render(req, res, null, 'Menssagem enviada com sucesso');
    }).catch(err => {

      contacts.render(req, res, err.message);
    })


  }
})

router.get('/menus', (req, res, next) => {

  menus.getMenus().then(results => {

    res.render('menu', {

      title: 'Menu',
      menus: results
    })
  })
});

router.get('/reservations', (req, res, next) => {

  reservations.render(req, res);
});

router.post('/reservations', (req, res, next) => {

  if (!req.body.name) {
    reservations.render(req, res, 'Insira o Nome');
  } else if (!req.body.email) {
    reservations.render(req, res, 'Insira o email');
  } else if (!req.body.people) {
    reservations.render(req, res, 'Insira o numero de pessoas');
  } else if (!req.body.date) {
    reservations.render(req, res, 'Insira a data');
  } else if (!req.body.time) {
    reservations.render(req, res, 'Selecione a hora');
  } else {

    reservations.save(req.body).then(results => {

      req.body = {};

      reservations.render(req, res, null, "Reserva realizada com sucesso!")

    }).catch(err => {

      reservations.render(req, res, err.message);
    })

  }
})

router.get('/services', (req, res, next) => {

  res.render('services', { title: 'Serviços' })
})

module.exports = router;
