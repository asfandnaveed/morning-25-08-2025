import db from "../config/database.js";
import jwt from 'jsonwebtoken';


export const adminLogin = (req, res) => {

    const { email, pass } = req.body;

    const query = "SELECT * FROM admins WHERE email=? AND `password`=?";

    db.query(query, [email, pass], (err, result) => {

        if (result.length > 0) {

            const token = jwt.sign(
                { 
                    adminId:result[0].id,
                    adminEmail:result[0].email
                } , 
                '^#BHF&($HKBFBQA@!#@#*$&?HFNL' , 
                {expiresIn:'1h'}
            );


            res.json({
                status: true,
                message: "Admin Logged In !",
                token:token,
                admin: result[0],
            });
        }
        else {
            res.json({
                status: false,
                message: "Invalid Credentials",
                admin: {},
            });
        }
    }
    );
};