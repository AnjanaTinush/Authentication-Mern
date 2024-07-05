const mongoose=require("mongoose")

const userSchema = mongoose.Schema(
    {
        name : {
            type : String,
            required : [true,"Please add a name"]
        },
        email: {
            type : String,
            required : [true,"Please add a email"],
            unique : true,
            trim : true,
            match: [
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "Please enter a valid emaial",
              ],
        },
        password : {
            type : String,
            required : [true,"Please add a password"]
        },
        photo : {
            type : String,
            required : [true,"Please add a photo"],
            default : "https://github.com/zinotrust/auth-app-styles/blob/master/assets/avatarr.png"
        },
        phone : {
            type : String,
           
            default : "+94"
        },
        bio : {
            type : String,
           
            default : "bio"
        },
        role : {
            type : String,
            required : true,
            default : "subscriber"
            //subscriber, autho , and admin (suspended)
        },
        isVerified : {
            type : Boolean,
            required : true,
            default : false
        },
        userAgent : {
            type : Array,
            required : true,
            default : []
        },
    },
    {
        timestamps : true,
        minimize : false
    }
)

const User = mongoose.model("User",userSchema)
module.exports = User