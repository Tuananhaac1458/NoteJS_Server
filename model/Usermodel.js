let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Dataname', { useNewUrlParser: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;

// Added check for DB connection
if(!db)
   console.log("Error connecting db")
else
   console.log("Db connected successfully")


   let UserSchema = mongoose.Schema({
       email:String,
       pass:String,
       name:String,
       avatarurl:String
   })

   module.exports = mongoose.model('user',UserSchema)