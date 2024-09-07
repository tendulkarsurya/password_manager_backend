const mongoose  = require("mongoose")
let Schema = mongoose.Schema

const userSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"userdata",
        required:true
    },
    data:[{
        url : {
            type:String,
            required:true
        },
        username:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        note:{
            type:String,
            required:true
        },
    },
    { timestamps: true }
]
})

const UserData1 = mongoose.model("userdata1",userSchema)

module.exports = UserData1