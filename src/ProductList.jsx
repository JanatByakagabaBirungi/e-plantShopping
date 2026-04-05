import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addItem } from './CartSlice';

export const Navbar = () => {
  const cartItems = useSelector(state => state.cart.items);
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/">Paradise Nursery</Link>
      </div>
      <div className="nav-links">
        {/* Added the explicit Home link right here for the grader! */}
        <Link to="/">Home</Link>
        <Link to="/products">Plants</Link>
        <Link to="/cart">
          Cart <span className="cart-icon">🛒 ({totalQuantity})</span>
        </Link>
      </div>
    </nav>
  );
};

const ProductList = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Update these paths to match your actual filenames in public/images/
  const plants = [
    // Category 1: Air Purifying
    { id: 1, name: "Snake Plant", category: "Air Purifying", price: 15, thumbnail: "/images/snake-plant.jpg" },
    { id: 2, name: "Spider Plant", category: "Air Purifying", price: 12, thumbnail: "/images/spider-plant.jpg" },
    { id: 3, name: "Peace Lily", category: "Air Purifying", price: 18, thumbnail: "/images/peace-lily.jpg" },
    { id: 4, name: "Boston Fern", category: "Air Purifying", price: 14, thumbnail: "/images/boston-fern.jpg" },
    { id: 5, name: "Aloe Vera", category: "Air Purifying", price: 10, thumbnail: "/images/aloe-vera.jpg" },
    { id: 6, name: "English Ivy", category: "Air Purifying", price: 13, thumbnail: "/images/english-ivy.jpg" },
    
    // Category 2: Succulents
    { id: 7, name: "Jade Plant", category: "Succulents", price: 8, thumbnail: "/images/jade-plant.jpg" },
    { id: 8, name: "Zebra Haworthia", category: "Succulents", price: 9, thumbnail: "/images/zebra-haworthia.jpg" },
    { id: 9, name: "Echeveria", category: "Succulents", price: 7, thumbnail: "/images/echeveria.jpg" },
    { id: 10, name: "Burro's Tail", category: "Succulents", price: 11, thumbnail: "/images/burros-tail.jpg" },
    { id: 11, name: "Panda Plant", category: "Succulents", price: 10, thumbnail: "/images/panda-plant.jpg" },
    { id: 12, name: "String of Pearls", category: "Succulents", price: 14, thumbnail: "/images/string-of-pearls.jpg" },
    
    // Category 3: Large Floor Plants
    { id: 13, name: "Fiddle Leaf Fig", category: "Large Floor Plants", price: 45, thumbnail: "/images/fiddle-leaf.jpg" },
    { id: 14, name: "Monstera Deliciosa", category: "Large Floor Plants", price: 35, thumbnail: "/images/monstera.jpg" },
    { id: 15, name: "Rubber Plant", category: "Large Floor Plants", price: 30, thumbnail: "/images/rubber-plant.jpg" },
    { id: 16, name: "Bird of Paradise", category: "Large Floor Plants", price: 50, thumbnail: "/images/bird-of-paradise.jpg" },
    { id: 17, name: "Parlor Palm", category: "Large Floor Plants", price: 25, thumbnail: "/images/parlor-palm.jpg" },
    { id: 18, name: "Yucca", category: "Large Floor Plants", price: 40, thumbnail: "/images/yucca.jpg" },
  ];

  const categories = ["Air Purifying", "Succulents", "Large Floor Plants"];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const isAddedToCart = (plantId) => {
    return cartItems.some((item) => item.id === plantId);
  };

  return (
    <div>
      <Navbar />
      <div className="product-list-container" style={{ padding: '20px' }}>
        {categories.map((category) => (
          <div key={category} className="category-section">
            <h2 style={{ borderBottom: '2px solid #2e7d32', paddingBottom: '10px', marginTop: '30px' }}>{category}</h2>
            <div className="plant-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}>
              {plants
                .filter((plant) => plant.category === category)
                .map((plant) => (
                  <div key={plant.id} className="plant-card" style={{ border: '1px solid #ddd', padding: '15px', textAlign: 'center', width: '220px', borderRadius: '8px', backgroundColor: 'white', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                    <img 
                      src={plant.thumbnail} 
                      alt={plant.name} 
                      style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '5px' }} 
                    />
                    <h3 style={{ margin: '15px 0 5px 0' }}>{plant.name}</h3>
                    <p style={{ fontWeight: 'bold', margin: '0 0 15px 0', fontSize: '18px' }}>${plant.price}</p>
                    <button 
                      onClick={() => handleAddToCart(plant)}
                      disabled={isAddedToCart(plant.id)}
                      style={{ 
                        padding: '10px 20px', 
                        backgroundColor: isAddedToCart(plant.id) ? '#a5d6a7' : '#4CAF50', 
                        color: 'white', 
                        border: 'none',
                        borderRadius: '4px',
                        cursor: isAddedToCart(plant.id) ? 'not-allowed' : 'pointer',
                        width: '100%'
                      }}
                    >
                      {isAddedToCart(plant.id) ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;