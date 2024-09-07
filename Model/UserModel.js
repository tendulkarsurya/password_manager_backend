const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		displayname: {
			type: String,
			required:true
		},
		email: {
			type: String,
			required:true

		},
		phone: {
			type: Number,
			required:true

		},
		password: {
			type: String,
			required:true

		},
		otp:{
			value:{
				type :Number,
			},
			createdin:{
				type: Date,			
			},
			expiresin:{		
				type: Date,			
			},
			// online:{
			// 	type:Boolean
			// },
			
		}
	},
	{ timestamps: true }
);

const UserModelDB = mongoose.model("userdata",userSchema)

module.exports=UserModelDB