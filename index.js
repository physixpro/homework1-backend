const express = require ('express');
const mongoose = require('mongoose')
const cors = require('cors')
const app = express();

app.use(cors())
// Connect to the mongodb db
mongoose.connect('mongodb+srv://data:1234@cluster0.qvhok.mongodb.net/Facebook?retryWrites=true&w=majority')
const db = mongoose.connection

//listen for any errors, if any errors occur , we will console.log it
db.on('error', console.error.bind(console, 'connection error:'));

// Once the db connection is open, we will just console log to confirm to ourselves that everything is up and running
db.once('open',function callback () {
    console.log('database is up and running');
});

//route handler
app.get('/', async (req,res) => {
    //use .find to get the feed , and await to wait for the tweets
    const feed = await db.collection('feed').find({}).toArray();
    res.json(feed)


})

// PORT 
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`listening on port ${port}...`));