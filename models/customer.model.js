const mongoose=require('mongoose');
const passportLocalMongoose=require('passport-local-mongoose');
const Schema=mongoose.Schema;
const customerSchema=new Schema(
    {
        firstname:{
            type: String,
            required: true,
        },
        lastname:{
            type: String,
            required: true,
        },
        email:{
            type: String,
            required: true,
            match: /.+\@.+\..+/,
            unique: true
        },
        role:{
            type: String,
        },
        profilepicture:{
            type: String,
        },
        age:{
            type: Number,
        },
        weight:{
            type:Number,
        },
        height:{
            type:Number,
        },
        hide:{
            type:String,
        },
        address:{
            type:String,
        },
        currentplan:{
            type:String,
        },
        nextrenewdate:{
            type:Date,
        },
        numberofexercises:{
            type:Number,
        },
        timedurationofallexercises:{
            type:Number,
        },
        totalcaloriesburnt:{
            type:Number,
        },
        phonenumber:{
            type:String,
        }
    },
    {
        timestamps:true,
    }
);
customerSchema.plugin(passportLocalMongoose,{usernameField: 'email'});
const Customer=mongoose.model('Customer',customerSchema);
module.exports=Customer;