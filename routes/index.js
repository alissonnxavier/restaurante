const conn = require('./../inc/db');
var express = require('express');
var app = express();
var router = express.Router();
var menus = require('./../inc/menus');

/* GET home page. */
router.get('/', function(req, res, next) {

  menus.getMenus().then(results =>{

    res.render('index', {
      title: 'Restaurante Saboroso',
      menus: results
    });
  })
  
});

router.get('/contacts', (req, res, next)=>{

  res.render('contact', { title: 'Contato'});
});

router.get('/menus', (req, res, next)=>{

  menus.getMenus().then(results =>{

    res.render('menu', {

      title: 'Menu',
      menus: results
    })
  })
});

router.get('/reservations', (req, res, next)=>{

  res.render('reservation', {title: 'Reservas'});
});

router.post('/reservations', (req, res, next)=>{

  res.send(req.body);
})

router.get('/services', (req, res, next)=>{

  res.render('services', {title: 'Serviços'})
})

module.exports = router;
