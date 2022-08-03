var express = require('express');
var users = require('./../inc/users')
var router = express.Router();

router.use(function(req, res, next){

    if(['/login'].indexOf(req.url) === -1 && !req.session.user){

        res.redirect('/admin/login');
    } else {

        next();
    }
})

router.get('/', (req, res, next) => {

    if (!req.session.user) {
        res.redirect('/admin/login');
    } else {
        res.render('admin/index');
    }


});

router.get('/contacts', (req, res, next) => {

    res.render('admin/contacts', {

    });
});

router.get('/emails', (req, res, next) => {

    res.render('admin/emails', {

    });
});

router.post('/login', (req, res, next) => {

    if (!req.body.email) {
        users.render(req, res, 'Insira o email');
    } else if (!req.body.password) {
        users.render(req, res, 'Insira a Senha');
    } else {

        users.login(req.body.email, req.body.password).then(user => {

            req.session.user = user;

            res.redirect('/admin');

        }).catch(err => {

            users.render(req, res, err.message || err);
        })
    }
})

router.get('/login', (req, res, next) => {



    users.render(req, res, null);
});

router.get('/menus', (req, res, next) => {

    res.render('admin/menus', {

    });
});

router.get('/reservations', (req, res, next) => {

    res.render('admin/reservations', {
        date: ''
    });
});

router.get('/users', (req, res, next) => {

    res.render('admin/users', {

    });
});

router.get('/logout', (req, res, next)=>{

    delete req.session.user;

    res.redirect('/admin/login');
})




module.exports = router;