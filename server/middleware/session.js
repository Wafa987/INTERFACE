var session = require('express-session');
const MongoStore = require('connect-mongo');

// Session for authentication
sess = session({
    secret: process.env.AUTH_TOKEN,
    resave: false,
    saveUninitialized: false,
    // Save sessions in MongoDB
    store: MongoStore.create({ mongoUrl: process.env.DB_URI }),
    unset: 'destroy'  
}); 
 
module.exports = sess