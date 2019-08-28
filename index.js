let express = require('express');
let app = express();

var manga_route = require('./route/mangas');
let user_route = require('./route/User');
let bodyParser = require('body-parser');

app.use(bodyParser.json(),bodyParser.text(),bodyParser.raw())

app.use(function(req,res,next){
    console.log(`${new Date().toString()} => ${req.originalUrl}`,req.body)
    next()
})

app.use(express.static('puclic'));

const PORT = process.env.PORT || 3000;
app.listen(PORT,function(){
    console.info(`Weocom to  ${PORT}`);
})

app.use(manga_route);
app.use(user_route);
app.get('/', function (req, res) {
    res.sendfile('index.html');
});
app.use((rep,res,next) =>{
    res.status(404).send("ERR 404")
})