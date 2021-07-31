const User = require("./User");
const Favorite = require("./Favorite");

User.hasOne(Favorite);
Favorite.belongsTo(User);

module.exports = { User, Favorite };