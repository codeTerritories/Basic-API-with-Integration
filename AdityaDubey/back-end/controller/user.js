const Joi = require("joi");
const bcrypt = require('bcryptjs');
const userModel =require('../model/userSchema');
const saltRound=10;


module.exports = {

    // User registration............
    registration: async (req, res, next) => {

        const validationSchema = Joi.object({
            name: Joi.string().required(),
            mobileNumber: Joi.number().required(),
            email: Joi.string().required(),
            password: Joi.string().required(),
            confirmPassword: Joi.string().required(),
        });

        try {
            const validatedBody = await validationSchema.validateAsync(req.body);


            const user = await userModel.findOne({
                email: validatedBody.email, status: { $ne: "DELETE" },
                userType: "USER",
            });
            if (user) {
                return res.status(409).send({ responseMessage: "Email already exists", responseCode: 409, });
            } else {
                
                if (validatedBody.password === validatedBody.confirmPassword) {
                    
                    console.log(validatedBody.password);
                    validatedBody.password = await bcrypt.hash(validatedBody.password,saltRound);

                    const result = await userModel.create(validatedBody);
                    return res.send({ result, responseCode: 200, responseMessage: "Success !!" })

                }
                return res.send({ responseCode: 403, responseMessage: "Password does not match !!" });
            }
        }
        catch (error) {
            return next(error);
        }
    },

    //  User Login..........
    login:async(req,res,next)=>{
        try {

            const {email,password}=req.query;
            console.log(req.query)

            const user=await userModel.findOne({email:email});
            if(user){
                      
                    if(bcrypt.compareSync(password,user.password)){
                        console.log("Success");
                        return res.send({responseCode:200,responseMessage:"Login success"});
                    }else{
                        return res.send({responseCode:401,responseMessage:"Incorrect Password !!"});
                    }
            }else{
                console.log("User not found");
                return res.send({responseCode:404,responseMessage:"User Not Found.."});

            }
            
        } catch (error) {
           return next(error); 
        }
    },

    // View user.................
    getUser:async(req,res,next)=>{
        try {
           
            const user= await userModel.findOne({_id:req.query.userId});

            if(!user){
                return res.send({responseMessage:"User not found !!",responseCode:404});
            }else if(user){
                console.log(user)
                return res.send({responseCode:200,responseMessage:"Success",user})
            }
        } catch (error) {
            return next(error);
        }
    }
}