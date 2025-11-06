import db from '../config/database.js';


export const userLogin = (req, res) => {
    const { email, pass } = req.body;

    const query = "SELECT * FROM users WHERE email=? AND `password`=?";

    db.query(query, [email, pass], (err, result) => {

        res.json({
            status:true,
            message:"User data",
            user:result[0]
        });
    }
    );
};




export const registerUser = (req, res) => {

    

    const { name,email,password,dob,gender,phone,address} = req.body;

    const checkEmailQuery = "SELECT * FROM users WHERE email= ?";

    db.query(checkEmailQuery , [email] ,(err , result)=>{

        if(result.length >0){
            return res.json({
                status:false,
                message:"Email Already Exist"
            });
        }
    });



    const query = 'INSERT INTO users (name, email, `password`,dob,gender,phone_number,address,created_at) VALUE (?,?,?,?,?,?,?, NOW() )';
    
    db.query(query, [name,email,password,dob,gender,phone,address], (err, result)=>{

        if(err){
            res.json({
                status:false,
                message:"Something went wrong!"
            });
        }else{
            res.json({
                status:true,
                message:"User Registered"
            });
        }
    } );
};