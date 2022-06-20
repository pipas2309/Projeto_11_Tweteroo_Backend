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
    }
    

    users.push(user);

    res.status(201).send("OK");
});




//POST TWEETS
app.post('/tweets', (req, res) => {

    const tweet = req.body;

    //validação
    if(!tweet.tweet) {
        res.status(400).send('Todos os campos são obrigatórios!');
    }

    const avatar = users.find(user => user.username === tweet.username).avatar;
    tweets.push({
        username: tweet.username,
        avatar: avatar,
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



app.listen(PORT, function(err){
    if(err) console.log(err);
    console.log("Server listening on PORT: ", PORT);
});