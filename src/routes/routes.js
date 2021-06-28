const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.get('/', (req, res) => {
    res.render('index', {
        title: "AdsPost",
        active: "Home",
        links: ["Home", "Services", "About Us", "Contact"]
    });
});
router.get('/index', (req, res) => {
    res.render('index', {
        title: "Home",
        active: "Home",
        links: ["Home", "Services", "About Us", "Contact"]
    });
});
router.get('/services', (req, res) => {
    res.render('services', {
        title: "Services",
        active: "Home",
        links: ["Home", "Services", "About Us", "Contact"]
    });
});
router.get('/about', (req, res) => {
    res.render('about', {
        title: "About Us",
        active: "Home",
        links: ["Home", "Services", "About Us", "Contact"]
    });
});
router.get('/contact', (req, res) => {
    res.render('contact', {
        title: "Contact",
        active: "Home",
        links: ["Home", "Services", "About Us", "Contact"]
    });
});

router.post('/send-email', (req, res) => {
    console.log(req.body);
    var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        post: 587,
        secure: false,
        auth: {
            user: "martinezsalasjuan.4a@gmail.com",
            pass: "aRC9BFeFAWvhcfH"
        }
    });

    var mailOptions = {
        from: req.body.email,
        to: "cm3046769@gmail.com",
        subject: req.body.subject,
        text: `
        Nombre:` + req.body.name + `
        Teléfono:` + req.body.tel + `

        ` + req.body.msg
    };
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            // s="ok";
            res.status(200);
            // window.location
            // res.render();
            // res.status(200).jsonp({data:"ok"});

        }
    });
});

module.exports = router;