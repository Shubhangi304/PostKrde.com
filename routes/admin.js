var express = require('express');
var path = require('path')
var usersmodel = require('../models/usersmodel');
var router = express.Router();

router.use(function(req, res, next) {
    if (req.session.unm == undefined || req.session.role != 'admin') {
        console.log('invalid user please login first')
        res.redirect('/logout')
    }
    next()
})

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('adminhome', { 'unm': req.session.unm, 'role': req.session.role });
});

var data
router.all('/addsubcategory', function(req, res, next) {

    usersmodel.fetchalldata('addcat', function(result) {
        data = result
    })
    setTimeout(function() {
        if (req.method == 'GET') {
            res.render('addsubcat', { 'result': '', 'mycat': data });
        } else {
            var cat_nm = req.body.cat_nm
            var sub_cat_nm = req.body.sub_cat_nm
            var myimg = req.files.cat_img
            var cat_img_nm = myimg.name



            var des = path.join(__dirname, '../public/uploads', cat_img_nm)
            myimg.mv(des, function(err) {
                if (err)
                    res.render('addsubcat', { 'result': 'Upload Failed...', 'mycat': data })
                else {
                    usersmodel.addsubcategory(cat_nm, sub_cat_nm, cat_img_nm, function(result) {
                        if (result)
                            res.render('addsubcat', { 'result': 'Category Added...', 'mycat': data })
                        else
                            res.render('addsubcat', { 'result': 'Category Not Added...', 'mycat': data })
                    })
                }
            })
        }
    }, 0.00011)
});




router.all('/addcategory', function(req, res, next) {
    if (req.method == 'GET')
        res.render('addcat', { 'result': '' })
    else {
        var cat_nm = req.body.cat_nm
        var myimg = req.files.cat_nm_img
        console.log(myimg);
        var cat_img_nm = myimg.name



        var des = path.join(__dirname, '../public/uploads', cat_img_nm)
        myimg.mv(des, function(err) {
            if (err)
                res.render('addcat', { 'result': 'Upload Failed...' })
            else {
                usersmodel.addcategory(cat_nm, cat_img_nm, function(result) {
                    if (result)
                        res.render('addcat', { 'result': 'Category Added...' })
                    else
                        res.render('addcat', { 'result': 'Category Not Added...' })
                })
            }
        })
    }
});



module.exports = router;