import jwt from 'jsonwebtoken';

function verifyToken(req, res, next) {


    const autheader = req.headers.authorization;

    if (!autheader) {
        res.status(401).json({
            message: "Token Missing ! "
        });
    } else {

        const token = autheader.split(' ')[1];



        try {

            const data  = jwt.verify(token , '^#BHF&($HKBFBQA@!#@#*$&?HFNL');

            next();

        } catch (e) {
            res.status(401).json({
                message: "Token expired ! "
            });
        }

    }


};


export default verifyToken;