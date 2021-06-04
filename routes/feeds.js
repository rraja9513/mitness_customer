const router=require('express').Router();
let Feed=require('../models/feed.model');
router.route('/').post((req, res) => {
    Feed.find({spam:'spam'})
      .then(feeds => res.json(feeds))
      .catch(err => res.status(400).json('Error: ' + err));
  });
 module.exports=router;