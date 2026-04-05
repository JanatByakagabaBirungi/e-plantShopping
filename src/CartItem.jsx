import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Navbar } from './ProductList';
import { removeItem, updateQuantity } from './CartSlice';

const CartItem = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity, 
    0
  );

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.id));
    }
  };

  const handleDelete = (id) => {
    dispatch(removeItem(id));
  };

  const handleCheckout = () => {
    alert("Coming Soon");
  };

  return (
    <div>
      <Navbar />
      <div className="cart-container" style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center' }}>Shopping Cart</h2>
        <h3 style={{ textAlign: 'center', marginBottom: '30px' }}>Total Cart Amount: ${totalAmount}</h3>
        
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p style={{ textAlign: 'center', fontSize: '18px' }}>Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item" style={{ display: 'flex', alignItems: 'center', gap: '30px', borderBottom: '1px solid #ddd', padding: '20px 0' }}>
                <img src={item.thumbnail} alt={item.name} style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '8px' }} />
                
                <div className="item-details" style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '20px', margin: '0 0 10px 0' }}>{item.name}</h4>
                  <p style={{ margin: '5px 0' }}>Unit Price: ${item.price}</p>
                  <p style={{ margin: '5px 0' }}><strong>Total for this plant: ${item.price * item.quantity}</strong></p>
                  
                  <div className="quantity-controls" style={{ display: 'flex', gap: '15px', alignItems: 'center', margin: '15px 0' }}>
                    <button onClick={() => handleDecrement(item)} style={{ padding: '5px 15px', fontSize: '18px', cursor: 'pointer' }}>-</button>
                    <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{item.quantity}</span>
                    <button onClick={() => handleIncrement(item)} style={{ padding: '5px 15px', fontSize: '18px', cursor: 'pointer' }}>+</button>
                  </div>
                  
                  <button 
                    onClick={() => handleDelete(item.id)}
                    style={{ backgroundColor: '#f44336', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-actions" style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <Link to="/products">
            <button style={{ padding: '15px 30px', backgroundColor: '#2e7d32', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px', cursor: 'pointer' }}>
              Continue Shopping
            </button>
          </Link>
          <button 
            onClick={handleCheckout} 
            style={{ padding: '15px 30px', backgroundColor: '#f0c14b', border: 'none', borderRadius: '5px', fontSize: '16px', cursor: 'pointer' }}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;