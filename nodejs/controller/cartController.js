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
      cartId: result.insertId,
    });
  });
};
