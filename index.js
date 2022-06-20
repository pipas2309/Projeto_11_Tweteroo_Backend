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
const PORT = 5000;

let teste


//POST SIGN-UP
app.post('/sign-up', (req, res) => {
   
    const user = req.body;

    //validação
    if(!user.username || !user.avatar) {
        res.status(400).send('Todos os campos são obrigatórios!');
    } else {
        users.push(user);
        res.status(201).send("OK");
    }
});




//POST TWEETS
app.post('/tweets', (req, res) => {

    const tweet = req.body;
    const avatar = users.find(user => user.username === tweet.username);

    //validação
    if(!tweet.tweet || !tweet.username) {
        res.status(400).send('Todos os campos são obrigatórios!');
    }
    if(!avatar) {
        res.status(401).send('Usuário não está logado!')
    }

    tweets.push({
        username: tweet.username,
        avatar: avatar.avatar,
        tweet: tweet.tweet
    });
    res.status(201).send("OK");
});




//GET TWEETS
app.get('/tweets', (req, res) => {

    let listaDeTweetsMaisNovos = [];
    const aux = [...tweets];
    aux.reverse();
    listaDeTweetsMaisNovos = aux.splice(0,10);

    res.send(listaDeTweetsMaisNovos);

});




//GET USER TWEETS 
app.get('/tweets/:userName', (req, res) => {

    const userName = req.params.userName;
    let listaDeTweetsDoUsuario = [];
    listaDeTweetsDoUsuario = tweets.filter(user => user.username === userName)

    res.send(listaDeTweetsDoUsuario);

});



app.listen(PORT, function(err){
    if(err) console.log(err);
    console.log("Server listening on PORT: ", PORT);
});