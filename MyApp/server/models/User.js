const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

const UserSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    otp:{type:String},
    otpExpires:{type:Date},
});

UserSchema.pre('save',async (next)=>{
    if(!this.isModified('password')){
        return next();
    }
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
    next();
});

module.exports=mongoose.model('User',UserSchema);