import React, { useEffect, useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5002/api/product/")
      .then((res) => res.json())
      .then((data) => {
        if (data.status) setProducts(data.products);
      })
      .catch((err) => console.error("Error fetching products:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-gradient" role="status"></div>
      </div>
    );
  }

  return (
    <section className="product-section py-5">
      <div className="container-fluid">
        <div className="text-center mb-5">
          <h1 className="display-5 fw-bold gradient-text">Our Products</h1>
          <p className="text-muted fs-5">Crafted with precision, brewed with passion.</p>
        </div>

        <div className="row g-4 justify-content-center">
          {products.map((product) => (
            <div key={product.id} className="col-md-6 col-lg-4 col-xl-3">
              <div className="card product-card shadow-lg border-0">
                <div className="image-container">
                  <img
                    src={
                      product.image
                        ? product.image
                        : "https://via.placeholder.com/400x300?text=No+Image"
                    }
                    alt={product.name}
                    className="card-img-top"
                  />
                  <div className="overlay">
                    <button
                      className="btn btn-light text-dark rounded-pill px-4 py-2 fw-semibold"
                      onClick={() => navigate(`/product/detail/${product.id}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
                <div className="card-body text-center">
                  <h5 className="fw-bold text-dark mb-1">{product.name}</h5>
                  <p className="text-muted small mb-2">{product.description}</p>
                  <h6 className="price-tag mb-0">
                    {product.price.toLocaleString()} PKR
                  </h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;