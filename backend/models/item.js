const mongoose = require('mongoose');

const ProductSchema= new mongoose.Schema({
    name:{
       type:String,
    },
    price:{
        type:Number,
    },
    description:{
        type:String,
    },
    category:{
        type:String
    },
    image:{
        type:String
    }

})
module.exports = mongoose.model("item", ProductSchema);