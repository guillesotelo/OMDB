const Sequelize = require('sequelize') 
const db = require('../db')

class Favorite extends Sequelize.Model {}
Favorite.init({
      imdbID: {
        type: Sequelize.STRING,
      },
      Poster: {
        type: Sequelize.STRING,
      },
      Title: {
        type: Sequelize.STRING,
      },
      Year: {
        type: Sequelize.STRING,
      },
      Type: {
        type: Sequelize.STRING,
      },
}, { sequelize: db, modelName: 'favorite', timestamps: false })

module.exports =  Favorite 