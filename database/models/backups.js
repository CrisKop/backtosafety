const mongoose = require("mongoose");

const LevelSchema = new mongoose.Schema({
    userID: { type: String },
  backupid: { type: String },
  backupInfo: { type: Object }
});

module.exports = mongoose.model('backups', LevelSchema);