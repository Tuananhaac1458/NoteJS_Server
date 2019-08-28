let Usermodel = require('../model/Usermodel')
let express = require('express')
let router = express.Router()


router.post('/user', function (req, res) {
    if (false) {
        return res.status(400).send("Request fall")
    }
    else{
            if(req.status="login"){
           Usermodel.findOne({email:req.body.email}).then(doc => {
           if(doc){
                if(req.body.pass==doc.pass){
                    return res.json(JSON.parse('{"status":true,"mes":"sucress"}'))         
                }
                return res.json(JSON.parse('{"status":false,"mes":"Wrong of pass"}'))
            }
            return res.json(JSON.parse('{"status":false,"mes":"User no exits"}'))
            }).catch(err => {
            res.status(500).json(err)
            })
    }
    }

    // let model = new Usermodel(req.body)
    // model.save()
    //     .then(function (doc) {
    //         if (!doc || doc.length === 0) {
    //             return res.status(500).send(doc)
    //         }
    //         res.status(201).send(doc)
    //     })
    //     .catch(err => {
    //         res.status(500).json(err)
    //     })
 //var name = req.body.name;
//res.json(req.body.status);


})


// router.get('/user',function(req,res){
//         // if(!req.query.name){
//         //     return res.status(400).send("No paramaster name")
//         // }
//     Usermodel.find({}).then(doc =>{
//         res.json(doc);
//     }).catch(err =>{
//         res.status(500).json(err)
//     })
// })




router.get('/user/login', function (req, res) {
    if(!req.query.email || !req.query.pass){
        res.json({
            "status":false,
            "message":"Nhập đầy đủ thông tin"
        })
    }else{
        Usermodel.findOne({email:req.query.email,pass:req.query.pass}).then(doc => {
            res.json({
                "status":true,
                "message": "Xin chào "+doc.name
            });
        }).catch(err => {
            res.status(500).json({"status":false,"message":"Sai thông tin đăng nhập"})
        })
    }

})

router.get('/user/register', function (req, res) {
    if(!req.query.email || !req.query.pass || !req.query.name){
        res.json({
            "status":false,
            "message":"Nhập đầy đủ thông tin"
        })
    }else{
        Usermodel.findOne({email:req.query.email}).then(doc => {
            if(doc){
                res.json({
                    "status":false,
                    "message": "Email "+req.query.email+" đã được sử dụng"
                });
            }else{
                var newuser = new Usermodel({email:req.query.email,pass:req.query.pass,name:req.query.name});
                newuser.save(function(err,doc){
                    if(err){
                        console.log(err);
                        res.status(500).send(err);
                    }
                    res.json({"status":true,"message":"success",doc});
                })
            }
        }).catch(err => {
            res.status(500).json(err);
        }) 
    }

})








router.get('/user', function (req, res) {
    if (req.query.page && req.query.limit) {
        if (parseInt(req.query.page) == 1) {
            Usermodel.find({}).limit(parseInt(req.query.limit)).then(doc => {
                res.json(doc);
            }).catch(err => {
                res.status(500).json(err)
            })
        } else {
            Usermodel.find({}).skip(parseInt(req.query.limit) * (parseInt(req.query.page)) - 1).then(doc => {
                if (doc.length == 0) {
                    res.status(400).send("bad_parameter");
                }
                res.json(doc);
            }).catch(err => {
                res.status(500).json(err)
            })
        }
    } else if (req.query.email && req.query.pass) {
        Usermodel.findOne({ email: req.query.email }).then(doc => {
            res.json(doc)
        }).catch(err => {
            res.status(500).json(err)
        })
    } else
        res.status(400).send("bad_parameter");
});

router.put('/user', function (req, res) {
    if (!req.query.name) {
        return res.status(400).send("No paramaster name")
    }
    Usermodel.findOneAndUpdate({ name: req.query.name }, req.body, { new: true }).then(doc => {
        res.json(doc);
    }).catch(err => {
        res.status(500).json(err)
    })
})


router.delete('/user', function (req, res) {
    if (!req.query.name) {
        return res.status(400).send("No paramaster name")
    }

    Usermodel.findOneAndRemove({ name: req.query.name }).then(doc => {
        res.json(doc);
    }).catch(err => {
        res.status(500).json(err)
    })
})

module.exports = router;