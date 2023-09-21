const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken')



router.get('/', (req, res) => {
    res.send('getting here in router'+ JSON.stringify(process.env.JWT_SECRET))
})

router.post('/generateToken', (req, res) => {
    let data = {
        id: 123, username: 'exampleuser'
    };

    const accessToken = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '2m' });
    const refreshToken = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.send(accessToken +' and the refresh token is '+refreshToken);
})

router.post('/verifyToken', (req, res) => {
    // first get bearer token from header
    const token = req.headers.authorization?.split(' ')[1];

    const verify = jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
        if(err){
            console.log('err',err.message);
            // return res.status(403).json({message:'invalid token'})
        }else{
            console.log(decode)
        }
    })
    res.send('verify token')
})

module.exports = router