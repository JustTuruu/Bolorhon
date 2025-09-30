import React from 'react';
import './ProductModal.css';

const ProductModal = ({ 
  isOpen, 
  product, 
  onClose, 
  onAddToCart, 
  onBuyNow 
}) => {
  if (!isOpen || !product) return null;

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div className="product-detail-modal animate-slide-up" onClick={(e) => e.stopPropagation()}>
        <button 
          className="modal-close-btn"
          onClick={onClose}
        >
          ✕
        </button>
        
        <div className="modal-content">
          <div className="modal-image-section">
            {product.image && product.image.startsWith('/images/') ? (
              <>
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="modal-product-img"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentNode.querySelector('.modal-product-emoji-fallback').style.display = 'flex';
                  }}
                />
                <div className="modal-product-emoji-fallback" style={{display: 'none'}}>
                  {product.emoji}
                </div>
              </>
            ) : (
              <div className="modal-product-emoji">
                {product.emoji || product.image}
              </div>
            )}
            {product.badge && (
              <span className={`modal-badge ${product.badge.toLowerCase()}`}>
                {product.badge}
              </span>
            )}
          </div>
          
          <div className="modal-info-section">
            <div className="modal-header">
              <h2>{product.name}</h2>
              <div className="modal-rating">
                <span className="stars">⭐ {product.rating}</span>
                <span className="rating-text">Маш сайн үнэлгээ</span>
              </div>
            </div>
            
            <p className="modal-description">{product.description}</p>
            
            <div className="modal-features">
              <div className="feature-item">
                <span className="feature-icon">🎨</span>
                <div>
                  <strong>Өнгөнүүд:</strong>
                  <p>{product.colors.join(', ')}</p>
                </div>
              </div>
              
              <div className="feature-item">
                <span className="feature-icon">{product.inStock ? '✅' : '❌'}</span>
                <div>
                  <strong>Бэлэн байдал:</strong>
                  <p>{product.inStock ? 'Бэлэн байгаа' : 'Дууссан'}</p>
                </div>
              </div>
            </div>
            
            <div className="modal-price">
              <span className="price-label">Үнэ:</span>
              <span className="price-value">{product.price.toLocaleString()}₮</span>
            </div>
            
            <div className="modal-actions">
              <button 
                className={`modal-add-to-cart ${!product.inStock ? 'disabled' : ''}`}
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                disabled={!product.inStock}
              >
                {product.inStock ? '🛒 Сагсанд нэмэх' : '❌ Дууссан'}
              </button>
              
              <button 
                className="modal-buy-now"
                onClick={() => onBuyNow(product)}
                disabled={!product.inStock}
              >
                💳 Шууд худалдан авах
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;