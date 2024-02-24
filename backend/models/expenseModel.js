const {Schema, mongoose, model} = require('mongoose');

const ExpenseSchema = new Schema({
    title:{type: String, required: true, trim: true, maxLength: 50},
    amount:{type: Number, required: true, maxLength: 20, trim: true},
    type:{type: String, default: 'income'}, 
    date:{type: Date, required: true, trim: true},
    category:{type: String, required: true, trim: true},
    description:{type: String, maxLength: 50, trim: true}
},{timestamps:true})

const expenseModel = model('Expenses', ExpenseSchema);

module.exports = expenseModel;