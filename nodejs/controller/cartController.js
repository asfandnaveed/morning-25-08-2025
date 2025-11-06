


export const addCartItems = (req, res)=>{

    const {productId, quantity}  = req.body;

    const query = "INSERT INTO cart (product_id , quantity , user_id , created_at) VALUE (?,?,?, NOW())";

};