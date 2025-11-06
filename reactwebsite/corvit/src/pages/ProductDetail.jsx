import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../App.css";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5002/api/product/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status) setProduct(data.products);
      })
      .catch((err) => console.error("Error fetching product:", err))
      .finally(() => setLoading(false));
  }, [id]);

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
          {/* Image Side */}
          <div className="col-lg-6">
            <div className="detail-image-wrapper position-relative">
              <img
                src={
                  product.image
                    ? product.image
                    : "https://via.placeholder.com/600x500?text=No+Image"
                }
                alt={product.name}
                className="img-fluid detail-image"
              />
              <div className="image-shadow"></div>
            </div>
          </div>

          {/* Info Side */}
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

              <div className="d-flex flex-wrap gap-3">
                <button className="btn btn-buy-now px-5 py-3 rounded-pill fw-semibold">
                  Add to cart
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
