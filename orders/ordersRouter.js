const express = require('express')
const stripe = require('stripe')(`${process.env.STRIPE_KEY}`)

const router = express.Router()

router.get('/secret', async (req, res, next) => {
    const intent = await stripe.paymentIntents.create({
        amount: 1099,
        currency: 'usd'
      })

    res.status(200).json({ client_secret: intent.client_secret })
})


module.exports = router