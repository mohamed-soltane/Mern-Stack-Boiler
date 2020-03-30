const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const db = require('./config/key').mongoURI

const { User } = require('./models/user');


//* connected to mongoDB
mongoose.connect(db, {useNewUrlParser: true}).then(() => console.log('DB connected')).catch(err => console.log.error(error));


app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());
app.use(cookieParser());

//* Welcome Page
app.post('/api/user/register', (req,res) => {
    const user = new User(req.body);
    user.save((err, userData) => {
        if(err) return res.json ({ succes: false, err })
        return res.status(200).json({ success:true})
    })
    });




const Port = 5000;
app.listen(Port, console.log(`server started on port ${Port}`));