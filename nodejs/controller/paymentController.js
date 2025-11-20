import Stripe from "stripe"



export const createPayment =async (req ,res) =>{


    const payment = Stripe('');

    const {price} = req.body;

    try{

        const chargePayment =await  payment.paymentIntents.create({
            amount:price,
            currency:'usd'
        });

        res.json({
            status:true,
            message:"Payment !",
            client: chargePayment.client_secret
        });


    }catch(e){
        console.log('Error :'+e);
    }

}