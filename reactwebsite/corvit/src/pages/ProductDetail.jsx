import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../App.css";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [feedback, setFeedback] = useState({ message: "", type: "" });
  const [adding, setAdding] = useState(false);

  // Fetch Product Details
  useEffect(() => {
    fetch(`http://localhost:5002/api/product/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status) setProduct(data.products);
      })
      .catch((err) => console.error("Error fetching product:", err))
      .finally(() => setLoading(false));
  }, [id]);

  // Handle Quantity Change
  const handleQuantityChange = (type) => {
    setQuantity((prev) => {
      if (type === "increase") return prev + 1;
      if (type === "decrease" && prev > 1) return prev - 1;
      return prev;
    });
  };

  // Handle Add to Cart
  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setFeedback({
        message: "Please login to add items to your cart.",
        type: "warning",
      });
      return;
    }

    setAdding(true);
    setFeedback({ message: "", type: "" });

    try {
      const res = await fetch("http://localhost:5002/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: quantity,
        }),
      });

      const data = await res.json();
      if (data.status) {
        setFeedback({
          message: "✅ Product added to cart successfully!",
          type: "success",
        });
      } else {
        setFeedback({
          message: "⚠️ Failed to add product to cart.",
          type: "danger",
        });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      setFeedback({
        message: "❌ Server error. Please try again later.",
        type: "danger",
      });
    } finally {
      setAdding(false);
      setTimeout(() => setFeedback({ message: "", type: "" }), 3000);
    }
  };

  // Loader
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-gradient" role="status"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center mt-5">
        <h4>Product not found</h4>
      </div>
    );
  }

  return (
    <section className="product-detail-fluid py-5">
      <div className="container-fluid px-lg-5">
        <button
          className="btn btn-outline-dark mb-4 rounded-pill px-4"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <div className="row align-items-center gx-5 gy-5">
          {/* Image */}
          <div className="col-lg-6">
            <div className="detail-image-wrapper position-relative">
              <img
                src={
                  product.image ||
                  "https://via.placeholder.com/600x500?text=No+Image"
                }
                alt={product.name}
                className="img-fluid detail-image"
              />
              <div className="image-shadow"></div>
            </div>
          </div>

          {/* Info */}
          <div className="col-lg-6">
            <div className="product-info-card shadow-lg p-5 rounded-4">
              <h1 className="fw-bold gradient-text mb-3 display-5">
                {product.name}
              </h1>
              <p className="text-muted fs-5 mb-4">{product.description}</p>

              <h2 className="price-text mb-3">
                {product.price.toLocaleString()} PKR
              </h2>

              <ul className="list-unstyled text-secondary mb-4 fs-6">
                <li>
                  <strong>SKU:</strong> {product.sku}
                </li>
                <li>
                  <strong>Stock Available:</strong> {product.stock}
                </li>
              </ul>

              {/* Quantity Selector */}
              <div className="d-flex align-items-center mb-4">
                <button
                  className="btn btn-outline-dark rounded-circle me-3"
                  style={{ width: "40px", height: "40px" }}
                  onClick={() => handleQuantityChange("decrease")}
                >
                  −
                </button>
                <span className="fw-bold fs-4">{quantity}</span>
                <button
                  className="btn btn-outline-dark rounded-circle ms-3"
                  style={{ width: "40px", height: "40px" }}
                  onClick={() => handleQuantityChange("increase")}
                >
                  +
                </button>
              </div>

              {/* Feedback Message */}
              {feedback.message && (
                <div
                  className={`alert alert-${
                    feedback.type === "success"
                      ? "success"
                      : feedback.type === "warning"
                      ? "warning"
                      : "danger"
                  } py-2`}
                >
                  {feedback.message}
                </div>
              )}

              {/* Buttons */}
              <div className="d-flex flex-wrap gap-3">
                <button
                  className="btn btn-buy-now px-5 py-3 rounded-pill fw-semibold"
                  onClick={handleAddToCart}
                  disabled={adding}
                >
                  {adding ? "Adding..." : "Add to Cart"}
                </button>
                <button className="btn btn-outline-secondary px-5 py-3 rounded-pill fw-semibold">
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
