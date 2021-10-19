// dependencies
const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()


// db
const connectDB = require('./models/db');
const tripModel = require('./models/Trip');
const userModel = require('./models/User');
connectDB()

// Body-parser
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const secret = process.env.SECRET;

//verify cookie data with token data, to stay logged in
app.get('/user', (req,res)=>{
    const payload = jwt.verify(req.cookies.token,secret)
    User.findById(payload.id)
        .then(userInfo =>{
            res.json({id:userInfo._id,username:userInfo.username,email:userInfo.email})
        })
})

//Sign up
app.post('/signup', async (req, res) => {
    try {
        const user = await userModel.find({$or: [{username: req.body.username, email: req.body.email}]})
        console.log(await user);
        if (user.length) {
            res.send('Existing user or email.')
        } 
        else {
            const hashedPassword = await bcrypt.hashSync(req.body.password, 12);
            const data = await userModel.create(
                {
                    username: req.body.username,
                    email: req.body.email,
                    password: hashedPassword,
                }
            )
            res.send(data);
        }
    } catch (err) {
        console.log(err.message);
        res.send('Existing user or email.');
    }
})

//Login
app.post('/login', async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await userModel.findOne({username});
        console.log(user);
        if (user){
            const comparePassword = await bcrypt.compareSync(password, user.password)
            // console.log(comparePassword);
            if(comparePassword){
                const accessToken = jwt.sign({user}, secret)
                // console.log(accessToken)
                res.send("logined");
            } else {
                res.send('Wrong password')
            }  
        } else {
            return res.send('Invalid username/password');
        }
    } catch (err) {
        console.log(err.message);
        return err.message;
    }
})

function authToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log('token',token);
    if (token == null) {
        return res.send('User not authed');
    }
    jwt.verify(token, secret, (err, user) => {
        if (err) {
            return res.send('jwt error');
        }
        req.user = user;
        next();
    })
}

//Logout
app.post('/logout',(req,res)=>{
    res.cookie('token','').send()
})

///////////////////////////////////////////////////////

// Get all trips
app.get('/', async (req, res) => {
    console.log(req.user);
    try {
        const data = await tripModel.find(req.user);
        res.send(data);
    } catch (error) {
        console.log({status: 'bad', msg: error.message});
    }
})

// Get 1 trip 
app.get('/trip/:id', async (req, res) => {
    try {
        const data = await tripModel.findOne({_id: req.params.id});
        res.send(data);
    } catch (error) {
        console.log({status: 'bad', msg: error.message});
    }
})

// Create 1 trip
app.post('/', async (req, res) => {
    try {
        const data = await tripModel.create(req.body);
        res.send('added new trip')
        console.log({status: 'ok', msg: 'added new trip'});
    } catch (error) {
        console.log({status: 'bad', msg: error.message})
    }
})

// Delete 1 trip
app.delete('/trip/:id', async (req, res) => {
    try {
        await tripModel.deleteOne({_id: req.params.id})
        res.send('deleted')
    } catch (error) {
        console.log({status: 'bad', msg: error.message})
    }
})

// Update 1 trip
app.put('/trip/:id', async (req, res) => {
    try {
        const data = await tripModel.findOneAndUpdate({_id: req.params.id}, req.body)
        res.send(data)
    } catch (error) {
        console.log({status: 'bad', msg: error.message})
    }
})

// Add activities
app.put('/days/:id', async (req, res) => {
    try {
        console.log('params',req.params.id)
        const data = await tripModel.updateOne({"days._id": req.params.id},{ "$push": {"days.$.activities": req.body}})
        console.log(req.body)
        console.log(data);
        res.send('edited')
    } catch (error) {
        console.log({status: 'bad', msg: error.message})
    }
})
// Edit activities - not working
app.put('/activities/:id', async (req, res) => {
    try{
        // const data = await tripModel.updateOne({"days.activities._id": req.params.id}, {"$set": {"days.$.activities": req.body}});
        const data = await tripModel.findOne({"activities._id": req.params.id});
        console.log(data.days);
        data.days.map(element => {
            return element.activities.map(element =>{
                if (element._id == req.params.id){
                    element = {
                        "name": "carrot",
                        "startTime": "16:05",
                        "endTime": "17:05",
                        "transport": "Test"
                    }
                    return element;
                }
            })
        })
        await data.updateOne();
        console.log(data.days[1].activities[1]);
        
        res.send('updated');
    } catch(err){
        console.log({status: 'bad', msg: err.message})
    }
})


// Delete activities
app.delete('/activities/:id', async (req, res) => {
    try {
        console.log('params', req.params.id)
        const data = await tripModel.updateOne({"activities._id": req.params.id}, {"$pull": {"days.$[].activities": {"_id": req.params.id}}})
        console.log(data);
        res.send(data)
    } catch (err) {
        console.log({status: 'bad', msg: err.message})
    }
})
// FUCKING IMPORTANT

// db.players.updateMany(
//     { scores: { $gte: 10 } },
//     { $set: { "scores.$[e]" : 10 } },
//     { arrayFilters: [ { "e": { $gte: 10 } } ] }
//  )



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server connect on port ${PORT}`);
})