const router=require('express').Router();
let Payment=require('../models/payment.model');
router.route('/').get((req, res) => {
    Payment.find()
      .then(payments => res.json(payments))
      .catch(err => res.status(400).json('Error: ' + err));
  });
 module.exports=router;