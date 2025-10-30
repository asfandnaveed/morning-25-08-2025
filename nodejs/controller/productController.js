import db from '../config/database.js';


export const getProducts = (req,res)=>{

    const query = 'SELECT * FROM products';
    
     db.query( query, (err,result)=>{
        res.json(
            {
                status:true , 
                message:"All Products Data" , 
                products:result
            });
    });
}