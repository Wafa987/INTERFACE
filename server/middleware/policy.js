// Cross origin policy
const cors = require("cors");

policy = cors({
    origin: 'http://localhost:3000',
    credentials: true 
});

module.exports = policy