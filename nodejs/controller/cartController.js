import db from "../config/database.js"; 

// ✅ Add item to cart
export const addCartItems = (req, res) => {
  
  const { productId, quantity } = req.body;
  const userId = req.user.id; 

  if (!productId || !quantity) {
    return res.status(400).json({ status: false, message: "Product ID and quantity are required!" });
  }

  const query = `
    INSERT INTO cart (product_id, quantity, user_id, created_at)
    VALUES (?, ?, ?, NOW())
  `;

  db.query(query, [productId, quantity, userId], (err, result) => {
    if (err) {
      console.error("Error adding to cart:", err);
      return res.status(500).json({ status: false, message: "Database error!" });
    }

    res.status(200).json({
      status: true,
      message: "Item added to cart successfully!",
      
    });
  });
};


export const getCartItems = (req , res)=>{

  const userId = req.user.id;


  const query = `SELECT c.product_id , c.quantity , p.id , p.name, p.image , p.price 
  FROM cart c INNER JOIN products p ON c.product_id = p.id WHERE c.user_id= ?`;

  db.query(query , [userId] , (err , result)=>{

    if(err){

      return res.status(500).json({
        status:false,
        message:"Server Error !"
      });
    }

    if(result.length ==0){

      return res.json({
        status:true,
        message:"Cart is Empty"
      });
    }
    else{
      return res.json({
        status:true,
        message:"Cart data",
        cart: result
      });
    }



  });



};
