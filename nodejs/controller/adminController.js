import db from "../config/database.js";


export const adminLogin = (req, res) => {

    const { email, pass } = req.body;

    const query = "SELECT * FROM admins WHERE email=? AND `password`=?";

    db.query(query, [email, pass], (err, result) => {

        if (result.length > 0) {
            res.json({
                status: true,
                message: "Admin Logged In !",
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