var express = require('express');
var mymail = require('mymail');
var path = require('path')
var md5 = require('md5');
var usersmodel = require('../models/usersmodel');
var encryptionhelper = require('encryptionhelper');
var router = express.Router();
var data
    // usersmodel.fetchalldata('addcat', function(result) {
    //     data = result
    // })

var data1
    // usersmodel.fetchalldata('addsubcat', function(result) {
    //     data1 = result
    // })

/* GET home page. */
router.get('/', function(req, res, next) {
    usersmodel.fetchalldata('addcat', function(result) {
        data = result
        res.render('index', { 'mycat': data });
    });

});




var data2;
router.all('/addpost', function(req, res, next) {

    if (req.method == 'GET') {
        usersmodel.fetchalldata('addsubcat', function(result) {
            data2 = result;
            res.render('addpost', { 'result': '', 'mycat': data2 });

        })

    } else {
        var data3 = req.body
            // var cat_nm = req.body.myimg1
        var myimg = req.files.myimg1
        console.log(myimg);
        var cat_img_nm = myimg.name
        data3.myimg1 = cat_img_nm
        var des = path.join(__dirname, '../public/uploads', cat_img_nm)


        myimg.mv(des, function(err) {
            if (err) {
                res.render('addcat', { 'result': 'Upload Failed...', 'mycat': data2 })
            } else {
                usersmodel.addpost('addpost', data3, function(result) {
                    if (result)
                        res.render('addpost', { 'result': 'upload successfully', 'mycat': data2 });
                    else
                        res.render('addpost', { 'result': 'upload failed', 'mycat': data2 });
                })
            }
        });
    }


})






router.get('/viewsubcat/:catnm', function(req, res, next) {
    var catnm = req.params.catnm
    usersmodel.fetchalldata('addcat', function(result) {
        data = result
    })
    setTimeout(function() {
        usersmodel.fetchsubcat('addsubcat', catnm, function(result) {
            res.render('viewsubcat', { 'mycat': result, 'mycat1': data });
        })
    }, 0.700);
});

router.get('/viewshowpost/:catnm', function(req, res, next) {

    var catnm = req.params.catnm
    usersmodel.fetchsubcat('addpost', catnm, function(result) {
        res.render('showpost', { 'mycat': result });
    })

})




router.get('/about', function(req, res, next) {


    //var dec=encryptionhelper.decipher('my-pet-is-xyz',enc)
    res.render('about');
});

router.get('/contact', function(req, res, next) {


    //var dec=encryptionhelper.decipher('my-pet-is-xyz',enc)
    res.render('contact');
});
router.get('/service', function(req, res, next) {
    res.render('service');
});





router.get('/loginauthentication/:emailid', function(req, res, next) {
    emailid = req.params.emailid
    usersmodel.authenticationupdate(emailid, function(result) {
        if (result)
            res.redirect('/login');
        else
            res.redirect('/register');
    })
});




router.all('/login', function(req, res, next) {

    var u = req.cookies.username
    var p = req.cookies.password
    if (u == undefined)
        u = ''
    if (p == undefined)
        p = ''

    if (req.method == 'GET')
        res.render('login', { 'result': '', 'u': u, 'p': p });
    else {
        var data = req.body
        usersmodel.logincheck('register', data, function(result) {
            //console.log(result)
            if (result.length == 0)
                res.render('login', { 'result': 'login failed..', 'u': u, 'p': p });
            else {
                if (data.chk != undefined) {
                    res.cookie('username', data.unm)
                    res.cookie('password', data.pass)
                }
                req.session.unm = result[0].unm
                req.session.role = result[0].role
                if (result[0].role == 'admin')
                    res.redirect('/admin')
                else
                    res.redirect('/users')
            }
        })
    }
});

router.all('/register', function(req, res, next) {
    if (req.method == 'GET')
        res.render('register', { 'result': '' });
    else {
        var data = req.body
        usersmodel.userregistration('register', data, function(result) {
            if (result) {
                mymail.sendmail(data.unm, data.pass, function(result) {
                    if (result)
                        res.render('register', { 'result': 'Register successfully..' });
                    else
                        res.render('register', { 'result': 'Registration failed..' });
                })
            } else
                res.render('register', { 'result': 'Registration failed..' });
        })
    }
});

router.get('/logout', function(req, res, next) {
    req.session.destroy()
    res.redirect('/login')
});




module.exports = router;