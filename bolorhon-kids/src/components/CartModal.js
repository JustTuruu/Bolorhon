import React from 'react';
import './CartModal.css';

const CartModal = ({ 
  isOpen, 
  cartItems, 
  onClose, 
  onRemoveItem, 
  onCheckout 
}) => {
  if (!isOpen) return null;

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h3>🛒 Таны сагс</h3>
          <button 
            className="close-cart"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-cart-icon">🛒</div>
              <p>Таны сагс хоосон байна</p>
              <small>Бүтээгдэхүүн сонгож сагсандаа нэмээрэй!</small>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">
                  {item.image && item.image.startsWith('/images/') ? (
                    <>
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="cart-item-img"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentNode.querySelector('.cart-item-emoji-fallback').style.display = 'flex';
                        }}
                      />
                      <div className="cart-item-emoji-fallback" style={{display: 'none'}}>
                        {item.emoji}
                      </div>
                    </>
                  ) : (
                    <div className="cart-item-emoji">
                      {item.emoji || item.image}
                    </div>
                  )}
                </div>
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p className="item-quantity">Тоо ширхэг: <strong>{item.quantity}</strong></p>
                  <p className="item-price">{(item.price * item.quantity).toLocaleString()}₮</p>
                </div>
                <button 
                  className="remove-item"
                  onClick={() => onRemoveItem(item.id)}
                  title="Сагснаас хасах"
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>
        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-summary">
              <div className="cart-total">
                <span className="total-label">Нийт үнэ:</span>
                <span className="total-amount">{getTotalPrice().toLocaleString()}₮</span>
              </div>
              <div className="cart-info">
                <small>Хүргэлтийн хөлс: <strong>Үнэгүй</strong></small>
              </div>
            </div>
            <button 
              className="checkout-btn"
              onClick={onCheckout}
            >
              💳 Худалдан авах ({cartItems.length})
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;