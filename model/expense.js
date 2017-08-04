'use strict';

const mongoose = require('mongoose');
const Expense = require('./expense.js');

const expenseSchema = mongoose.Schema({
  content: {type: String, required: true},
  expense: {type: mongoose.Schema.Types.ObjectId, required: true, ref :'expense'},
});

expenseSchema.pre('save', function(next) {
  console.log('pre save doc', this);
  Expense.findById(this.expense)
  .then(expense=> {
    let expenseIDSet = new Set(category.expenses);
    expenseIDSet.add(this._id);
    category.expenses = Array.from(expenseIDSet);
    return category.save();
  })
.then(() => next())
.catch(() =>
  next(new Error('validation failed to create expense because category does not exist')));
});

expenseSchema.post('remove', function(doc, next){
  console.log('post remove doc', doc);
  Expense.findById(doc.category)
  .then(category => {
    cateogry.expenses = cateogry.expenses.filter(expense => expense._id !==doc._id);
    return expense.save();
  })
  .then(() => next())
  .catch(next);
});

module.exports = mongoose.model('expense', expenseSchema);
