const express = require('express')
const passport = require('passport')
const router = express.Router()
const { User, Favorite } = require('../models')
 
//----------Log---------
router.post('/register', (req, res) => {
    // console.log("User: ", req.body)
    User.create(req.body)
        .then(user => { res.status(201).send(user) })
})

router.post('/login', passport.authenticate("local"), (req, res) => {
    res.send(req.user)    
})

router.post('/logout', (req, res) => {
    req.logOut()
    res.sendStatus(200)
})




//--------Favoritos---------
//Busco y muestro los favs de la tabla Favorites, con el userID
router.get('/favorites', (req, res) => {
    // console.log("ROUTER GET FAV: ", req)
    const {userId} = req.query
    if(userId){
        Favorite.findAll({ where: { userId: userId }})
            .then(favs => res.send(favs))
    }
    if(req.user) {
        Favorite.findAll({ where: { userId: req.user.id }})
            .then(favs => res.send(favs))
    }
})

// posteo peli en Favorites, con el userID
router.post('/favorites', (req, res) => {
    if(req.user) {
        // console.log("ROUTER POST FAV: ", req.user)
        const { userId } = req.query
        const { imdbID, Poster, Title, Year, Type } = req.body
        Favorite.create(
            {
                userId: userId, 
                imdbID: imdbID,
                Poster: Poster,
                Title: Title,
                Year: Year,
                Type: Type
            })
        .then((fav) => res.send(fav))
    }
})

//borro de Favorites la peli con paramIDque tengan userID
router.delete('/favorites', (req, res) => {
    if(req.user) {
        const { userId, movieId } = req.query
        Favorite.findOne({ 
            where: { 
                imdbID: movieId, 
                userId: userId 
            }})
            .then((fav) => fav.destroy())
            .then(() => res.sendStatus(204))
    }
})




//----------Users-----------

router.get('/user', (req, res) => {
    // console.log("ROUTER GET FAV: ", req)
    const {userId} = req.query
    if(userId){
        User.findByPk(userId)
            .then(user => res.send(user))
    }
    User.findAll().then(users => res.send(users))
})


module.exports = router