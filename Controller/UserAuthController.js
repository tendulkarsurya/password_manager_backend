const express = require("express");
const UserModelDB = require("../Model/UserModel");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
require('dotenv').config()

class UserAuth {
  async createuser(req, res) {
    try {
      const { displayname, email, phone, password } = req.body;

      console.log("sdkjfh", displayname, phone, email, password);

      const checkeddrs = await UserModelDB.findOne({ email: email });

      if (checkeddrs) {
        console.log(checkeddrs._id);
        return res.status(409).json({
          message: "ac already exist",
          data: email,
        });
      }

      let hashpass = await bcrypt.hash(password, 10);

      console.log(hashpass);

      let data = await UserModelDB.create({
        displayname: displayname,
        email: email,
        password: hashpass,
        phone: phone,
      });

      console.log(data);

      if (data) {
        return res.status(201).json({
          message: "success",
          data: data,
        });
      }
      if (!data) {
        return res.status(402).json({
          message: "error in crete iser",
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async userlogin(req, res) {
    const { email, password } = req.body;

    try {
      let check = await UserModelDB.findOne({ email: email });
      if (!check) {
        return res.status(401).json({
          message: "Email not found ...! ",
        });
      }
      let checkpass = await bcrypt.compare(password, check.password);

      if (!checkpass) {
        return res.status(501).json({
          message: "password incorrect",
        });
      }

      if (check && checkpass) {
        res.status(201).json({
          message: "welcome  !",
          data: {
            name: check.displayname,
            email: check.email,
            phone: check.phone,
            id: check._id,
          },
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async requsetotp(req, res) {
    const { email } = req.body;

    const checkeddrs = await UserModelDB.findOne({ email: email });

    if (!checkeddrs) {
      return res.status(404).json({
        message: "Invalid email ",
      });
    }
    if (checkeddrs) {
      let otp = Math.floor(100000 + Math.random() * 900000);

      let saveotp = await UserModelDB.findByIdAndUpdate(
        checkeddrs._id,
        {
          $set: {
            otp: {
              value: otp,
              createdin: new Date(),
              expiresin: new Date(Date.now() + 5 * 60 * 1000),
            },
          },
        },
        { new: true }
      );

      if (saveotp) {
        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "civilgethu@gmail.com",
            pass: process.env?.key ,
          },
        });

        let mailOptions = {
          from: '"Password Manager" <civilgethu@gmail.com>',
          to: checkeddrs.email,
          subject: "Password Manager Password Reset (OTP)", // Subject line
          text: `Dear ${checkeddrs.displayname} here the OTP ${otp} .It will be valid only for 5-min`, // Plain text body
          // html: '<b>Hello world?</b>' // HTML body (optional)
        };

        let info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);

        return res.status(201).json({
        	message:"OTP sent check mail",

        })
      }
    }
  }

  async otpverify(req,res) {
    const {email,otp,newpassword}=req.body

    try {
      
      let hashpass = await bcrypt.hash(newpassword, 10);

    let checksss = await UserModelDB.findOne({ email:email });
    // console.log(checksss);
    

    if (checksss) {
      console.log("email found");
      let otpdb = checksss.otp.value
      let otpexpried = checksss.otp.expiresin
      let nowt = Date.now()
      let nowtdd = Date.now() + 5*60*1000

      let time = new Date(nowt)
    
      let diffInMs = Math.abs(otpexpried-time)
      let caltime = Math.floor(diffInMs /1000) ;
      if(caltime <= 5*60){
          if (otpdb === otp) {
            let changepass = await UserModelDB.findByIdAndUpdate(
              checksss._id,
              { $set: { password: hashpass } } ,
              {new:true}
            )

            if (changepass) {
              res.status(201).json({
                message:"password changed"

              })
              let changeotp = await UserModelDB.findByIdAndUpdate(
                checksss._id,
                {
                  $set: {
                  'otp.value': Math.random(),             // Set the new OTP value
                  }
              },
                {new:true}
              )
            }
          }else{
            res.status(410).json({
              message:"Otp incorrect"
            })
          }
      }else{
        res.status(410).json({
          message:"Otp Expired"
        })
      }
      
      

    
   }else{
    console.log("email not found");
    
   }
      

      
    } catch (error) {
      
    }
  }
}

const UserAuthController = new UserAuth();
module.exports = UserAuthController;
