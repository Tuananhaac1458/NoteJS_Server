let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Dataname', { useNewUrlParser: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;

// Added check for DB connection
if(!db)
   console.log("Error connecting db")
else
   console.log("Db connected successfully")


   let MangaSchema = mongoose.Schema({
         thum:String,
         name:String,
         status:String,
         tacgia:String,
         dis:String,
         categori:Array,
         chapter : [{
            name : String,
            content : String
             }]
   })

   module.exports = mongoose.model('Manga',MangaSchema)