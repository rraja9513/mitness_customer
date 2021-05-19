const router=require('express').Router();
const passport=require('passport');
let Customer=require('../models/customer.model');
router.route('/').get((req, res) => {
    Customer.find()
      .then(customers => res.json(customers))
      .catch(err => res.status(400).json('Error: ' + err));
  });
router.route('/signup').post((req,res)=>{
    const Customers=new Customer({ firstname : req.body.firstname,lastname:req.body.lastname,email:req.body.email,role:req.body.role,age:req.body.age,weight:req.body.weight,height:req.body.height,address:req.body.address,currentplan:req.body.currentplan,nextrenewdate:Date(req.body.nextrenewdate),numberofexercises:req.body.numberofexercises,timedurationofallexercises:req.body.timedurationofallexercises,totalcaloriesburnt:req.body.totalcaloriesburnt,phonenumber:req.body.phonenumber});   
        Customer.register(Customers,req.body.password,function(err,customer){
            if(err)
            {
                console.log(err);
            }
            else{
                passport.authenticate("customerLocal")(req,res,function(){
                    if (req.user) {
                        var redir = { returnCode: "Success",
                                      returnMsg:"Customer registered Successfully"};
                        return res.json(redir);
                  } else {
                    res.status(400).json({ message: 'SignupFailed' });
                  }
                });
            }
        })
    });
router.route('/login').post((req,res)=>{
    const customer=new Customer({
        email:req.body.email,
        password:req.body.password
    });
    req.login(customer,function(err){
        if(err){
            console.log(err)
        }
        else{
            passport.authenticate("customerLocal")(req,res,function(){
                if (req.user) {
                    var redir = { returnCode: "Success",
                                  returnMsg:"Login Success"
                };
                    return res.json(redir);
              } else {
                res.status(400).json({ message: 'Credentials Are Incorrect' });
              }
            });
        }
    });
 });
 router.route('/forgotpassword').post((req,res)=>{
     if(req.isAuthenticated()){
        Customer.findOne({ email: req.body.email })
        .then((customer) => {
            customer.setPassword(req.body.password,(err, customer) => {
                if (err) return next(err);
                customer.save();
                res.status(200).json({ message: 'Successful Password Reset' });
            });
        })
     }
     else{
         res.redirect('/login');
     }
});
router.route('/changepassword').post((req,res)=>{
    if(req.isAuthenticated()){
    Customer.findOne({ email: req.body.email })
    .then((customer) => {
        customer.changePassword(req.body.oldpassword, req.body.newpassword,(err, customer) => {
            if (err) return next(err);
            customer.save();
            res.status(200).json({ message: 'Password Change Successful' });
        });
    })
}
else{
    res.redirect('/login');
}
});
router.route('/update/:id').post((req, res) => {
    if(req.isAuthenticated()){
    Customer.findById(req.params.id)
      .then(customer => {
        customer.firstname = req.body.firstname;
        customer.lastname = req.body.lastname;
        customer.email = req.body.email;
        customer.phonenumber =Number(req.body.phonenumber);
  
        customer.save()
          .then(() => res.json('User updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
    }
    else
    {
        res.redirect('/login');
    }
  });
 module.exports=router;