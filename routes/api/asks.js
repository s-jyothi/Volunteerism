const Ask = require('../../models/Ask');

const validateAskInput = require('../../validation/ask');

const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get("/", (req, res) => {
  Ask.find()
    .sort({ date: -1 })
    .then(asks => res.json(asks))
    .catch(err => res.status(404).json({ noasksfound: "No asks found"}));
});

router.patch('/:id/comment', (req, res) => {
  Ask.findById(req.params.id)
    .then(ask => {
      if (!ask) {
        errors.id = 'Ask does not exist';
        return res.status(400).json(errors);
      } else {
        Ask.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, ask) {
          if (err) {
            console.log("err", err);
            res.status(500).send(err);
          } else {
            console.log("success");
            res.send(ask);
          }
        })
      }
    })
    .catch(err => console.log(err))
});

router.get('/user/:user_id', (req, res) => {
  Ask.find({ user: req.params.user_id })
    .then(asks => res.json(asks))
    .catch(err => 
      res.status(404).json({ noasksfound: "No asks found from that user"})
    );
});

router.get('/:id', (req, res) => {
  Ask.findById(req.params.id)
    .then(ask => res.json(ask))
    .catch(err => 
      res.status(404).json({ noaskfound: "No ask found with that ID" })
    );
})

router.post('/', (req, res) => {
    const { errors, isValid } = validateAskInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newAsk = new Ask({
      category: req.body.category,
      title: req.body.title,
      description: req.body.description,
      timeCommitment: req.body.timeCommitment,
      deadline: req.body.deadline,
      timeOfDay: req.body.timeOfDay,
      posterId: req.body.posterId,
      location: req.body.location,
    })

    newAsk.save().then(ask => res.json(ask));
  }
);

router.patch('/:id', (req, res) => {

  const { errors, isValid } = validateAskInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Ask.findById(req.params.id)
    .then(ask => {
      Object.assign(ask, req.body);
      ask.save()
        .then(ask => res.json(ask))
        .catch(err => 
          res.status(400).json({ asknotchanged: "Ask could not be updated"})
        );
    })
    .catch(err => 
      res.status(404).json({ noaskfound: "No ask found with that ID" })
    );
  }
);

router.delete('/:id', (req, res) => {
  Ask.findById(req.params.id)
    .then(ask => {
      ask.delete()
        .then(ask => res.json(ask))
        .catch(err => 
          res.status(400).json({ asknotchanged: "Ask could not be deleted"})
        );
    })
    .catch(err =>
      res.status(404).json({ noaskfound: "No ask found with that ID"})
    );
});

module.exports = router;