require('dotenv').config();
const userModel = require('./models/userModel');
const incomeModel = require('./models/incomeModel');
const expenseModel = require('./models/expenseModel');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const PORT = process.env.PORT;
const jwtpassword = process.env.secret;
const MongoUri = process.env.MongoUri;
const salt = 10;
const app = express();

//@dev Middlewares.
app.use(express.json());
app.use(cors({credentials:true, origin:'https://expense-tracker-six-alpha.vercel.app'}));


//@dev Connect with MongoDb.
try{
    mongoose.connect(`mongodb+srv://${MongoUri}`);
    console.log('Connected to MongoDB')
}
catch(error){
    console.log(`Error Connecting with Database:${error}`);
}

//@dev Root End Point.
app.get('/', (req,res)=>{
    res.send('Hello, Its me');
});

//@dev SignUp Endpoint
app.post('/SignUp', async(req,res)=>{
    const {username, password} = req.body;
    try{
        const userData = await userModel.create({
            username,
            password: bcrypt.hashSync(password,salt)
        })
        res.json(userData);
        console.log('Signup Sucessfull'); 
    }
    catch(error){
        if(error.code === 11000){
            res.status(401).json({msg:'Username already exists',error});   
        }else{
            console.log('Error Saving user data to DB',error);
            res.status(400).json({msg:'Error Saving user data to DB',error});
        }
    }
});

//@dev Login Endpoint
app.post('/Login', async(req,res)=>{
    console.log('request Received');
    const {username, password} = req.body;
    try{
        const userData = await userModel.findOne({username});
        const passOk = bcrypt.compareSync(password, userData.password);
        if(passOk){
            jwt.sign({username,id:userData._id},jwtpassword,{},(error,token) => {
                if (error) throw error;
                res.cookie('token',token,{secure: true, sameSite: 'none'}).json({
                    id: userData._id,
                    username
                });
            });
        }
        else{
            console.log('Login Failed, Wrong credentials');
            res.status(400).json({msg:'Login Failed, Wrong credentials'});
        }
    }
    catch(error){
        res.status(400).json({msg:'Login Failed, Wrong credentials'});
    }
})

//@ Log Out Endpoint.
app.post('/logout', (req,res)=>{
    res.cookie('token','').json('ok');
});


//@Create Income Endpoint.
app.post('/addIncome', async(req,res)=>{
    console.log('Request:', req.body);
    const {title, amount, category, description, date} = req.body;
    try{
        if(!title || !category || !date || !description){
            res.status(400).json({msg:'Fields cannot be empty'});
            return;
        }
        if(amount <= 0 || isNaN(amount) ){
            res.status(400).json({msg:'Amount should be a positive Number'});
            return;
        }
        const incomeData = await incomeModel.create({
            title,
            amount,
            category,
            description,
            date
        });
        res.status(200).json(incomeData);
        console.log('Income Added Sucessfull'); 
    }catch(error)
    {
        res.status(500).json({msg:'Failed to add Income', err: error});
    }
});

//@Get Incomes Endpoint
app.get('/getIncome', async(req,res)=>{
    console.log('Received Request at get Income');
    try {
        const incomes = await incomeModel.find().sort({createdAt: -1});
        res.status(200).json(incomes);
    } catch (error) {
        res.status(500).json({msg:'Failed to Get Incomes', err: error});
    }   
});

//@Get Total Income Endpoint
app.get('/getTotalIncome', async(req,res) => {
    console.log('Received Request at get Total Income');
    try {
        const incomeArray = await incomeModel.find();
        console.log('income Array:', incomeArray);
        let total = 0;
        incomeArray.forEach((income)=>{
            total += income.amount;
        })
        res.status(200).json({total: total});
    } catch (error) {
        res.status(500).json({msg:'Failed to Get Total Incomes', err: error});
    }
})


//@dev Delete Income Endpoint
app.post('/deleteIncome', async(req,res)=>{
    console.log('Received delete req');
    const {id} = req.body;
    console.log('id::', id);
    incomeModel.findByIdAndDelete(id)
    .then(()=>{
        res.status(200).json({msg: "Income Deleted"})
    })
    .catch((error)=>{
        res.status(500).json({msg:"Failed to Delete Income", err: error});
    })
});

//@Create Expenses Endpoint
app.post('/addExpenses', async(req,res)=>{
    console.log('Request:', req.body);
    const {title, amount, category, description, date} = req.body;
    try{
        if(!title || !category || !date || !description){
            res.status(400).json({msg:'Fields cannot be empty'});
            return;
        }
        if(amount <= 0 || isNaN(amount) ){
            res.status(400).json({msg:'Amount should be a positive Number'});
            return;
        }
        const expenseData = await expenseModel.create({
            title,
            amount,
            category,
            description,
            date
        });
        res.status(200).json(expenseData);
        console.log('Expense Added Sucessfull'); 
    }catch(error)
    {
        res.status(500).json({msg:'Failed to add Expense', err: error});
    }
});

//@Get Expenses Endpoint
app.get('/getExpenses', async(req,res)=>{
    console.log('Received');
    try {
        const expenses = await expenseModel.find().sort({createdAt: -1});
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({msg:'Failed to Get Expenses', err: error});
    }   
});

//@dev Delete Expenses Endpoint
app.post('/deleteExpenses', async(req,res)=>{
    console.log('Received delete req');
    const {id} = req.body;
    console.log('id::', id);
    expenseModel.findByIdAndDelete(id)
    .then( () => {
        res.status(200).json({msg: "Expense Deleted"});
    })
    .catch((error)=>{
        res.status(500).json({msg:"Failed to Delete Expense", err: error});
    })
})

//@Get Total Expense Endpoint
app.get('/getTotalExpense', async(req,res) => {
    console.log('Received Request at get Total Expense');
    try {
        const expenseArray = await expenseModel.find();
        console.log('expense Array:', expenseArray);
        let total = 0;
        expenseArray.forEach((expense)=>{
            total += expense.amount;
        })
        res.status(200).json({total: total});
    } catch (error) {
        res.status(500).json({msg:'Failed to Get Total Expense', err: error});
    }
})

app.listen(PORT, ()=>{
    console.log(`Server listening on Port ${PORT}`);
})