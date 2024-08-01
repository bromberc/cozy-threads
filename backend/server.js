require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const YOUR_DOMAIN = 'http://localhost:3000';

app.post('/create-checkout-session', async (req, res) => {
    const line_items = req.body.items.map(item => ({
        price_data: {
            currency: 'usd',
            product_data: {
                name: item.title
            },
            unit_amount: item.price * 100,
        },
        quantity: item.quantity,
    }));

    try{
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            ui_mode: 'embedded',
            return_url: `${YOUR_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
            automatic_tax: {enabled: true},
        });
        res.send({clientSecret: session.client_secret});
    } catch (error) {
        console.log('Error creating checkout session: ', error);
    } 
});

app.get('/session-status', async (req, res) => {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

    res.send({
        status: session.status,
        customer_email: session.customer_details.email
    });
});

app.listen(4242, () => console.log('Listening on port ${4242}!'));