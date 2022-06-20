// Libs
import express from 'express';
import cors from 'cors';

//Config do APP
const app = express();
app.use(cors());
app.use(express.json());

//Variáveis Globais
const users = [];  // Lista de objetos [{ username: "", avatar: "" }]
const tweets = [];  // Lista de objetos [{ username: "", avatar: "", tweet: "" }]

let teste


//POST SIGN-UP
app.post('/sign-up', (req, res) => {
   
    const user = req.body;
    users.push(user);

    res.status(201).send("OK");
});




//POST TWEETS
app.post('/tweets', (req, res) => {

    const tweet = req.body;
    const avatar = users.find(user => user.username === tweet.username).avatar;
    tweets.push({
        username: tweet.username,
        avatar: avatar,
        tweet: tweet.tweet
    });
    res.send("OK");
});




//GET TWEETS
app.get('/tweets', (req, res) => {

    let listaDeTweetsMaisNovos = [];
    const aux = [...tweets];
    aux.reverse();
    listaDeTweetsMaisNovos = aux.splice(0,10);

    res.send(listaDeTweetsMaisNovos);

});



app.listen(5000);