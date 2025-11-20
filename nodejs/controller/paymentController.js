import Stripe from "stripe"



export const createPayment =async (req ,res) =>{


<<<<<<< HEAD
    const payment = Stripe('');
    
=======
    const payment = Stripe('sk_test_1un8Loa2pSXJdrVVvwP3KtPc00eBNpfQcI');
>>>>>>> parent of 57c0104 (changes)

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