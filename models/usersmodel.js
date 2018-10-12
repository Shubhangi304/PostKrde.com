var con = require('conn');

function userregistration(tbl_nm, data, cb) {
    data.status = 0;
    data.role = 'user'
        // var query = "insert into " + tbl_nm + " values(NULL,'" + data.nm + "','" + data.unm + "','" + data.pass + "','" + data.address + "','" + data.city + "','" + data.mob + "','" + data.gender + "'," + "0,'user')";
    db.collection(tbl_nm).insertOne(data, function(err, result) {
        if (err)
            console.log(err)
        else
            cb(result);
    })
}

function logincheck(tbl_nm, data, cb) {
    // var query = "select * from " + tbl_nm + " where unm='" + data.unm + "' && pass='" + data.pass + "' && status=1"
    db.collection(tbl_nm).find({ unm: data.unm, pass: data.pass, status: 1 }).toArray().then(function(result) {
            cb(result);
        })
        // con.query(query, function(err, result) {
        //     if (err)
        //         console.log(err)
        //     else
        //         cb(result)
        // })
}

function authenticationupdate(emailid, cb) {
    db.collection('register').update({ "unm": emailid }, { $set: { "status": 1 } }, function(err, result) {
        if (err)
            console.log(err)
        else
            cb(result);
    });
    // var query = "update register set status=1 where unm='" + emailid + "'"
    // con.query(query, function(err, result) {
    //     if (err)
    //         console.log(err)
    //     else
    //         cb(result)
    // })
}

function addcategory(cat_nm, cat_img_nm, cb) {
    db.collection('addcat').insertOne({ "cat_nm": cat_nm, "cat_nm_img": cat_img_nm }, function(err, result) {
            if (err)
                console.log(err)
            else
                cb(result);
        })
        // var query = "insert into addcat values(NULL,'" + cat_nm + "','" + cat_img_nm + "')"
        // con.query(query, function(err, result) {
        //     if (err)
        //         console.log(err)
        //     else
        //         cb(result)
        // })
}

function addsubcategory(cat_nm, sub_cat_nm, cat_img_nm, cb) {
    db.collection('addsubcat').insertOne({ "cat_nm": cat_nm, "sub_cat_nm": sub_cat_nm, "sub_cat_img": cat_img_nm }, function(err, result) {
            if (err)
                console.log(err)
            else
                cb(result);
        })
        // var query = "insert into addsubcat values(NULL,'" + cat_nm + "','" + sub_cat_nm + "','" + cat_img_nm + "')"
        // con.query(query, function(err, result) {
        //     if (err)
        //         console.log(err)
        //     else
        //         cb(result)
        // })
}

function fetchdata(tbl_nm, cb) {
    db.collection(tbl_nm).find().limit(9).toArray().then(function(result) {
            cb(result);
        })
        // var query = "select * from " + tbl_nm + " order by cat_id desc limit 0,9"
        // con.query(query, function(err, result) {
        //     if (err)
        //         console.log(err)
        //     else
        //         cb(result)
        // })
}

function fetchalldata(tbl_nm, cb) {
    db.collection(tbl_nm).find().toArray(function(err, result) {
            if (err)
                console.log(err);
            else
                cb(result);
        })
        // var query = "select * from " + tbl_nm
        // con.query(query, function(err, result) {
        //     if (err)
        //         console.log(err)
        //     else
        //         cb(result)
        // })
}

function fetchsubcat(tbl_nm, cat_nm, cb) {
    db.collection(tbl_nm).find({ "cat_nm": cat_nm }).toArray(function(err, result) {
            if (err)
                console.log(err);
            else
                cb(result);
        })
        // var query = "select * from " + tbl_nm + " where cat_nm='" + cat_nm + "'"
        // con.query(query, function(err, result) {
        //     if (err)
        //         console.log(err)
        //     else
        //         cb(result)
        // })
}

function addpost(tbl_name, data, cb) {
    db.collection(tbl_name).insertOne(data, function(err, result) {
        if (err)
            console.log(err)
        else
            cb(result)
    })
}

module.exports = { addpost: addpost, fetchsubcat: fetchsubcat, addsubcategory: addsubcategory, fetchalldata: fetchalldata, fetchdata: fetchdata, addcategory: addcategory, logincheck: logincheck, userregistration: userregistration, authenticationupdate: authenticationupdate }