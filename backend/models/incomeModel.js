const {Schema, mongoose, model} = require('mongoose');

const IncomeSchema = new Schema({
    title:{type: String, required: true, trim: true, maxLength: 50},
    amount:{type: Number, required: true, maxLength: 20, trim: true},
    type:{type: String, default: 'income'}, 
    date:{type: Date, required: true, trim: true},
    category:{type: String, required: true, trim: true},
    description:{type: String, maxLength: 50, trim: true},
    userID:{type: String}
},{timestamps:true})

const incomeModel = model('Incomes', IncomeSchema);

module.exports = incomeModel;