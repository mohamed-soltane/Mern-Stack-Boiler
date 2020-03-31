const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const db = require('./config/key').mongoURI

const { User } = require('./models/user');

const { auth } = require("./middleware/auth")

//* connected to mongoDB
mongoose.connect(db, {useNewUrlParser: true}).then(() => console.log('DB connected')).catch(err => console.log.error(error));


app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/api/user/auth', (req,res) => {
   res.status(200).json({
   _id:req._id,
   isAuth: true,
   email: req.user.email,
   name: req.user.name,
   lastname: req.user.lastename,
   role: req.user.role
   })
})


//* User Registration update
app.post('/api/user/register', (req,res) => {
    const user = new User(req.body);
    user.save((err, userData) => {
        if(err) return res.json ({ succes: false, err })
        return res.status(200).json({ success:true})
    })
    });

app.post('/api/user/login', (req,res) => {
    //find the email
    User.findOne({email: req.body.email}, (err, user) => {
        if (!user)
        return res.json({
            loginSuccess: false,
            message: "auth failed,email not found"
        });
    
    //comparePassword
    user.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch) {
         return res.json ({ loginSuccess: false, message: "wrong password" })
        }
    });

     //generateToken
    user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie("x_auth", user.token)
           .status(200)
           .json({ loginSucces: true })
        
    })

    })

})

app.get("/api/user/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});

const port = process.env.Port || 5000
app.listen(port, () => {
    console.log(`server started on port ${port}`)
});