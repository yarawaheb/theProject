const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({origin: "http://localhost:3000", optionsSuccessStatus:200}));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const refresh = require('./controller');
const cookieParser = require('cookie-parser')

//=========================

app.use(cookieParser());

app.use('/auth/login',function (req, res, next) {
    console.log('Time:', Date.now())
    console.log("inside middleware to call refresh");
    let x = refresh(req, res);
    console.log("refresh returned status = ", x);
    res.myStatusCode = x;
    next();
})
app.use('/users', require('./routes/users-routes'));
app.use('/posts', require('./routes/post-routes'));
app.use('/auth', require('./routes/auth'));

app.use("/conversations", require('./routes/conversations') );
app.use("/messages", require('./routes/messages'));
//=====================================
var server = app.listen(5435,'127.0.0.1' , function(){
    var port = server.address().port
    var host = server.address().address
    console.log("my app is lestining at http://%s:%s",host,port);
});





