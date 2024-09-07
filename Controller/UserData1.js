const DB = require("../Model/Userdata");

class Logindata {
  async getdata(req, res) {
    const { user, url, username, password, note } = req.body;
    try {
      let data = await DB.findOne({ user: user });

      if (data) {
        res.status(201).json({
          message: "Success Data Fetched",
          data: data,
        });
      } else {
        res.status(401).json({
          message: "Data Not Fetched",
        });
      }
    } catch (error) {
      res.status(405).json({
        message: error.message,
      });
    }
  }
  async postuserdata(req, res) {
    const { user, data } = req.body;

    try {
      let checkuser = await DB.findOne({ user: user });

      if (checkuser) {
        let datac = await DB.findByIdAndUpdate(
          checkuser._id,
          { $push: { data: data } },
          { new: true }
        );

        if (datac) {
          res.status(201).json({
            message: "Data created Success",
          });
        }
        if (!datac) {
          res.status(201).json({
            message: "Data Not Created",
          });
        }
      }
      if (!checkuser) {
        let loading = await DB.create({
          user: user,
          data: [],
        });

        if (loading) {
            let datac = await DB.findByIdAndUpdate(
                checkuser._id,
                { $push: { data: data } },
                { new: true }
              );
      
              if (datac) {
                res.status(201).json({
                  message: "Data created Success",
                });
              }
              if (!datac) {
                res.status(201).json({
                  message: "Data Not Created",
                });
              }
        }

      }
    } catch (error) {
      res.status(402).json({
        message: error,
      });
    }
  }
}
const UserloginController = new Logindata();
module.exports = UserloginController;
