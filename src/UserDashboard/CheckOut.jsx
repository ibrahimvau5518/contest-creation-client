import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import useAxios from '../hooks/useAxios';
import Swal from 'sweetalert2';
import { ImSpinner9 } from 'react-icons/im';
import { useNavigate } from 'react-router';

const CheckOut = ({ registerContest, clientSecret }) => {
  const { user } = useContext(AuthContext);
  const price = parseInt(registerContest?.price) || 0;
  const axiosSecure = useAxios();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [transactionId, setTransactionId] = useState('');

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
      billing_details: {
        email: user?.email || 'anonymous',
        name: user?.displayName || 'anonymous',
      },
    });

    if (pmError) {
      setError(pmError.message);
      setLoading(false);
      return;
    } else {
      setError('');
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

    if (confirmError) {
      setError(confirmError.message);
      setLoading(false);
      return;
    }

    if (paymentIntent.status === 'succeeded') {
      setTransactionId(paymentIntent.id);

      const payment = {
        registerId: registerContest?._id,
        contestName: registerContest?.contestName,
        contestType: registerContest?.contestType,
        price: registerContest?.price,
        prize: registerContest?.prize,
        task: registerContest?.task,
        image: registerContest?.image,
        hostName: registerContest?.hostName,
        hostEmail: registerContest?.hostEmail,
        hostImage: registerContest?.hostImage,
        ContestId: registerContest?.ContestId,
        date: new Date(),
        status: 'pending',
        participateUserName: user?.displayName,
        participateUserEmail: user?.email,
        participateUserPhoto: user?.photoURL,
        answer: e.target.answer.value,
        transactionId: paymentIntent.id,
        ContestDate: registerContest?.dates,
      };

      try {
        await axiosSecure.post('/payments', payment);
        Swal.fire({
          title: 'Payment Successful!',
          text: 'You have successfully submitted the contest.',
          icon: 'success',
        });
        navigate('/dashboard/participate');
        e.target.reset();
      } catch (err) {
        console.error('Save Payment Error:', err);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to save payment.',
          icon: 'error',
        });
      }
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="m-5">
      <div className="form-control mb-5">
        <label className="label">
          <span className="label-text">Task : {registerContest?.task}</span>
        </label>
        <textarea
          name="answer"
          className="textarea textarea-accent w-full"
          placeholder="Write your answer"
          required
        />
      </div>

      <CardElement
        className="border mx-10 p-5 border-[#0ecdb9]"
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#0ecdb9',
              '::placeholder': { color: '#0ecdb9' },
            },
            invalid: { color: '#9e2146' },
          },
        }}
      />

      <div className="flex flex-col items-center mt-10">
        <button
          className="btn bg-[#0ecdb9] text-white w-1/2 flex justify-center items-center"
          type="submit"
          disabled={!stripe || !clientSecret || loading}
        >
          {loading ? <ImSpinner9 className="animate-spin" /> : `Pay $${price}`}
        </button>
        {error && <p className="text-red-600 mt-2">{error}</p>}
        {transactionId && (
          <p className="text-green-600 mt-2">Transaction ID: {transactionId}</p>
        )}
      </div>
    </form>
  );
};

export default CheckOut;
