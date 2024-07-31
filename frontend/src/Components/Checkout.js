import { useCallback, useEffect, useState } from 'react';
import * as React from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
const stripePromise = loadStripe('pk_live_51PhD3vRpA6VhXFHy5CdMHlEl7CtPIOHZ2Fu7dQunAd3K469wh3QlBpjBdN1q3EAom5VC66VTihMoO9dvEH1abBvk00hqBsWmcq');

const Checkout = ({cart}) => {
    const [clientSecret, setClientSecret] = useState('');
    const fetchClientSecret = useCallback(async () => {
        try {
            const response = await fetch("http://localhost:4242/create-checkout-session", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ items: cart })
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.statusText}`);
            }

            const data = await response.json();
            setClientSecret(data.clientSecret);
        } catch (error) {
            console.error("Failed to fetch client secret:", error);
        }
    }, [cart]);

    useEffect(() => {
        fetchClientSecret();
    }, [cart, fetchClientSecret]);
    
    const options = { clientSecret };

    return (
        <div id="checkout">
            {clientSecret && (
                <EmbeddedCheckoutProvider
                    stripe={stripePromise}
                    options={options}
                >
                    <EmbeddedCheckout/>
                </EmbeddedCheckoutProvider>
            )}
        </div>
    );
}

export default Checkout;