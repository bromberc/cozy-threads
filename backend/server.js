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
    console.log('Received req to create session');
    console.log('Request body:', req.body);
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
            return_url: `${YOUR_DOMAIN}/return?session_id={CHECKOUT_SESSION_ID}`,
            //this needs to be created (page that just confirms the payment went through)
            automatic_tax: {enabled: true},
        });
        console.log("checkout session created");
        res.send({clientSecret: session.client_secret});
    } catch (error) {
        console.log('Error creating checkout session: ', error);
    } 
});

app.get('/session-status', async (req, res) => {
    console.log("calling app.get");
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

    res.send({
        status: session.status,
        customer_email: session.customer_details.email
    });
});

app.listen(4242, () => console.log('Listening on port ${4242}!'));