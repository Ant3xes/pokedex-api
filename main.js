const express = require('express');
var cors = require('cors')
const fs = require('fs');

const pathData = './pokedex.json'
const hostname = 'localhost'
const port = 5000
const app = express()
const myRouter = express.Router()
let Pokemons = fs.readFileSync(pathData)

Pokemons = JSON.parse(Pokemons)
Pokemons.sort((a, b) => (a.numéro > b.numéro) ? 1 : -1)

myRouter.route('/pokemons').get(function(req, res){
    res.json({
        message: 'Liste de tout les pokemon',
        pokemons: Pokemons
    })
})

myRouter.route('/pokemons/:pokemonId').get(function(req, res){
    pokemonId = req.params.pokemonId;
    let msg = '';
    if(pokemonId > 151) {
        msg = 'Aucun pokemon correspondant à ce numéro'
    } else {
        msg = `Pokemon n° ${pokemonId}`
    }
    const result = Pokemons.filter(pokemon => pokemon.numéro == pokemonId);
    res.json({
        message: msg,
        pokemon: result[0]
    })
})

app.use(cors())
app.use(myRouter)

app.listen(port, hostname, () => {
    console.log(`\nMy server work on http://${hostname}:${port} \n`);
})