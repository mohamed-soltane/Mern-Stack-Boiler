const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Soltane:Soltane92@react-blog-xjsli.mongodb.net/test?retryWrites=true&w=majority',
{useNewUrlParser: true}).then(() => console.log('DB connected')).catch(err => console.log.error(error));
app.get('/', (req,res) => {
    res.send('hello world')
});




const Port = 5000;
app.listen(Port, console.log(`server started on port ${Port}`));