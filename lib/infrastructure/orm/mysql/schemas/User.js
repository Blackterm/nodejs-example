const mysql = require('../mysql');

const userSchema = new mysql.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
});

module.exports = mysql.model('User', userSchema);
