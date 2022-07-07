const { User, Roles } = require("../db");

/*
? GET ALL USERS FROM DB 
*/
const getAllUsers = async (req, res, next) => {
  try {
    let DBData = await User.findAll();
    return res.send(DBData);
  } catch (error) {
    console.log(`GET DB DATA ${error}`);
  }
};

module.exports = {
  getAllUsers,
};
