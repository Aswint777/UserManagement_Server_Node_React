const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName :{
        type : String,
        required : true ,
        trim : true 
    },
    email : {
        type : String,
        required : true ,
        trim : true 
    },
    password : {
        type : String,
        required : true,
        trim : true  
    },
    date: {
        type: Date,
        default: new Date(),
      },
      status: {
        type: Boolean,
        default: true,
      },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
