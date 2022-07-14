const { setBanStatus } = require("../Models/utils/Admin");

async function banUser(req, res) {
  try {
    const { ban_email } = req.body;
    const msg = await setBanStatus(true, ban_email);
    res.json({ msg });
  } catch (e) {
    res.status(400);
    res.json({ msg: "Error: " + e.message });
  }
}

async function unbanUser(req, res) {
  try {
    const { unban_email } = req.body;
    const msg = await setBanStatus(false, unban_email);
    res.json({ msg });
  } catch (e) {
    res.status(400);
    res.json({ msg: "Error: " + e.message });
  }
}

module.exports = { banUser, unbanUser };
