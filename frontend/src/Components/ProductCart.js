import { useEffect, useState } from "react";
import Checkout from "./Checkout";

function ProductCart({ cart, removeFromCart}) {
    const [showCheckout, setShowCheckout] = useState(false);

    const handleCheckoutButtonClick = () => {
        setShowCheckout(true);
    }

    useEffect(() => {
        setShowCheckout(false);
    }, [cart])

    return (
        <div id="cart" className="page" style={{ display: 'none '}}>
            <h2>Cart - Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty - trying adding a product!</p>
            ) : (
                <div id="cartContainer" className="cart-container">
                    <div id="cartGrid" className="cart-grid">
                        {cart.map(item => (
                            <div key={item.id} className="product">
                                <div className="cart-image">
                                    <img src={item.image} alt={item.title} /> 
                                </div>
                                <div className="product-info">
                                    <h3>{item.title}</h3>
                                    <p className="price">Price: ${item.price}</p>
                                    <p>Quantity: {item.quantity}</p>
                                    <button onClick={() => removeFromCart(item)}>Remove From Cart</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div id="stripeCheckout" className="checkout">
                        {showCheckout ? (<Checkout cart={cart} />) : <button id="checkoutButton" onClick={handleCheckoutButtonClick}>Proceed to Checkout!</button>}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductCart;