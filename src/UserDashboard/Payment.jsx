import { useLoaderData } from 'react-router';
import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckOut from './CheckOut';
import axios from 'axios';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const Payment = () => {
  const registerContest = useLoaderData();
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const token = localStorage.getItem('access-token');
        const res = await axios.post(
          'http://localhost:5000/create-payment-intent',
          { price: registerContest?.price },
          {
            headers: { Authorization: token ? `Bearer ${token}` : '' },
          }
        );
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.error('Payment Intent Error:', err);
      }
    };

    if (registerContest?._id) {
      createPaymentIntent();
    }
  }, [registerContest]);

  if (!clientSecret) {
    return (
      <div className="flex justify-center items-center pt-72">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-center pt-44 text-4xl font-extrabold capitalize">
        Payment & Submit the Task
      </h1>

      <p className="text-end font-bold pr-4">
        Contest Price : {registerContest?.price || 0} $
      </p>

      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckOut
          registerContest={registerContest}
          clientSecret={clientSecret}
        />
      </Elements>
    </div>
  );
};

export default Payment;
