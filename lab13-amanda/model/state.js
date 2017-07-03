'use strict';

const mongoose = require('mongoose');
<<<<<<< HEAD
const Issue = require('./issue.js');
=======
const issue = require('./issue.js');
>>>>>>> 0233dd57a7a45ea0e56e598d65ef63acdc38d76e
const stateSchema = mongoose.Schema({
  content: {type: String, required: true},
  issue: {type: mongoose.Schema.Types.objectId, required: true, ref :'issue'},
});

stateSchema.pre('save', function(next) {
  console.log('pre save doc', this);
  Issue.findById(this.issue)
  .then(issue=> {
    let stateIDSet = new Set(issue.states);
    stateIDSet.add(this._id);
    issue.states = Array.from(stateIDSet);
    return issue.save();
  })
.then(() => next())
.catch(() =>
  next(new Error('validation failed to create state because issue does not exist')));
  })
.then(() => next())
.catch(() =>
  next(new Error('validation failed to create state because place does not exist')));
});

stateSchema.post('remove', function(doc, next){
  console.log('post remove doc', doc);
  Issue.findById(doc.list)
  .then(issue => {
    issue.states = issue.states.filter(state => state._id !==doc._id);
    return issue.save();
  })
  .then(() => next())
  .catch(next);
});

module.exports = mongoose.model('state', stateSchema);
