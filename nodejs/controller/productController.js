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

export const addProduct = (req ,res)=>{

    const {name, description , price, stock , sku ,image } = req.body;

    const query = "INSERT INTO products (name,description,price,stock,sku,image,created_at) VALUE (?,?,?,?,?,?, NOW())";

    db.query(query , [name, description , price, stock , sku ,image] , (err , result)=>{

        if(err){
            res.json({
                status:false,
                message: "DB Error !!"
            });
        }
        else{
            res.json({
                status:true,
                message: "Product Added !! "
            });
        }



    });

};