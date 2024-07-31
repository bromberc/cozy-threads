import React, { useState } from 'react';
import ProductCart from './Components/ProductCart.js';
import ProductFeed from './Components/ProductFeed.js';
import images from './Images/Images.js';
import './styles.css';

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      if (prevCart.find(item => item.id === product.id)) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    alert('Item added to cart');
  }

  const removeFromCart = (product) => {
    setCart((prevCart) => {
      const productInCart = prevCart.find(item => item.id === product.id);
      if (productInCart.quantity === 1) {
        return prevCart.filter(item => item.id !== productInCart.id);
      } else {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className='Title-Container'>
          <img src={images.logo} alt="Cozy Threads Logo" className="logo" />
          <h1 href="#" onClick={(e) => {render('home'); }}> Cozy Threads</h1>
        </div>
        <nav>
          <a href="#" onClick={(e) => {render('home'); }}>
            <img src={images.home} alt="Home Symbol"/>Store</a>
          <a href="#cart" onClick={(e) => {render('cart'); }}>
            <img src={images.cart} alt="Cart Symbol"/>Cart ({cart.reduce((total, item) => total + item.quantity, 0)})</a>
        </nav>
      </header>
      <main id="feed">
        <ProductFeed addToCart={addToCart}/>
        <ProductCart cart={cart} removeFromCart={removeFromCart}/>
        {/* <Checkout cart={cart} /> */}

      </main>
    </div>
  );

  function render(page) {
    document.querySelectorAll('.page').forEach(el => el.style.display = 'none');
    document.getElementById(page).style.display = 'block';
  }
}

export default App;
