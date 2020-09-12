const mongoose =  require('mongoose');
const schema  = mongoose.Schema;

urlSchema = new schema({
    longurl:{
        type:String,
        required:true
    },
    shorturl:{
        type:String,
    },
    clickcount:{
        type:Number,
        default:0
    }
});

var myUrl = mongoose.model('myUrl',urlSchema);
module.exports={myUrl}