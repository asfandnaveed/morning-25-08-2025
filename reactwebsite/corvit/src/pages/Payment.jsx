import { useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";


const stripeLoad = loadStripe('pk_test_sw7YSpxcZaXpmUjnuA6lD30m00XiWQTBta');


const chargePayment = async ()=>{

    const stripe = useStripe();
    const element = useElements();

    const data  = await fetch('http://localhost:5001/api/payment/create-payment',{
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            price:200
        })
    });

    const jsonData =await data.json();




}