let express = require('express');
let router = express.Router();
let Mangamodel = require('../model/Mangamodel')

const theloais = ['Kiếm Hiệp','Kinh Dị','Trinh Thám','Ngôn Tình','Hài Hước','Tình Cảm'];
//query sử dụng để lấy dữ liệu câu hỏi
// ex: http://locallhost/manga?name=tuananh&status=20 (name và staus is query)/////////////////
router.get('/manga', function(req,res){
    if(req.query.theloai){
        //res.send(`You have cal ${req.query.name}`)
        var number = parseInt(req.query.theloai);
       // res.json(theloais[number]);
        Mangamodel.find({categori: theloais[number]}).then(doc =>{
            res.json(doc);
          }).catch(err => {
            res.status(500).json(err)
        })
    }else{
        res.send(`not manga`)     
    }
});

//param sử dụng để lấy dữ liệu trên phần link //
// ex: http://locallhost/manga/tuananh    (tuananh is params)////// 
router.get('/manga/:name', function(req,res){
        if(req.params.name === 'all'){
            Mangamodel.find().then(doc =>{
                res.json(doc);
              }).catch(err => {
                res.status(500).json(err)
            })
        }else if(req.params.name === 'removebyid'){
            if(req.query.id){
                Mangamodel.findByIdAndRemove(req.query.id,function(doc){
                        res.json({
                            "status":true,
                            "message": "Removed "+req.query.id
                        });
                    
                }).catch(err =>{
                    res.status(500).json(err)
                })
            }else{
                res.status(500).send('not id')
            }
        }else if(req.params.name === 'findbyid'){
            if(req.query.id){
                Mangamodel.findOne({_id: req.query.id}).then(doc => {
                        res.json(doc);
                }).catch(err =>{
                    res.status(500).json(err)
                })
            }else{
                res.status(500).send('not id')
            }
        }
        else{
            res.status(404).send('not found');
        }
});
router.post('/manga', function (req, res) {
    var name = req.body.name;
    var thum = req.body.thum;
    var tacgia = req.body.tacgia;
    var dis = req.body.dis;
    var categori = req.body.categori;
    var status = req.body.status;
    var chapter = req.body.chapter;
    if(!name || !thum ||!tacgia ||!dis ||!categori || !status || !chapter){
        res.json({"status": false,"message":"Nhập đầy đủ thông tin", "form":"{name:'',thum:'',tacgia:'',dis:'',categori:'',status:'',chapter:''}"});
    }else{
        var magane = new Mangamodel(req.body);
        magane.save(function(err,doc){
            if(err){
                console.log(err);
                res.status(500).send(err);
            }
            res.json({"status":true,"message":"success",doc});
        })
    }
    
});

module.exports = router;