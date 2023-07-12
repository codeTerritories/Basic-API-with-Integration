const {Types,Schema,model} = require('mongoose')

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true
    },
    mobileNumber:{
        type:Number,
        unique:true
    },
    otp:{
        type:String
        
    },
    password:{
        type:String
    },
    isOtpVerify:{
        type:Boolean,
        default:false
    },
    time:{
        type:Number

    },
    userType:{
        type:String,
        enum:['USER','ADMIN'],
        default:'USER'
    },
    status:{
        type:String,
        enum:['ACTIVE','DELETED','BLOCKED'],
        default:'ACTIVE'
    }
  
},{timestamps:true}
);

module.exports = model('user',userSchema);