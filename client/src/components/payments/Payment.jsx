import React, { useState } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51PDpiZP9aYeGaiLJZahRQZQCb1nhCZLQbZVHaJsGlhvUxdza4PdGzlhCuJE04TJveyyQQMZM3qyRsxLWOoezgm6l00NxP3X15D');

const Payment = () => {
  const [userId, setUserId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [paymentStatus, setPaymentStatus] = useState(null);

  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async () => {
    try {
      // Step 1: Request Payment Intent from the backend
      const response = await axios.post('http://localhost:5000/payments/processPayment', {
        userId,
        courseId,
        amount: parseFloat(amount),
        currency,
      });

      console.log(response);

      const clientSecret = response.data.clientSecret;

      console.log(clientSecret);

      // Step 2: Confirm payment with Stripe
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      console.log(result);

      if (result.error) {
        setPaymentStatus({ success: false, message: result.error.message });
      } else if (result.paymentIntent.status === 'succeeded') {
        setPaymentStatus({ success: true, message: 'Payment succeeded' });
      }
    } catch (error) {
      setPaymentStatus({ success: false, message: error.response?.data?.error || 'Payment failed' });
    }
  };

  return (
    <div>
      <h2>Payment Form</h2>
      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Course ID"
        value={courseId}
        onChange={(e) => setCourseId(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
      </select>
      <div>
        <CardElement />
      </div>
      <button onClick={handlePayment}>Make Payment</button>
      {paymentStatus && (
        <div>
          {paymentStatus.success ? (
            <p style={{ color: 'green' }}>{paymentStatus.message}</p>
          ) : (
            <p style={{ color: 'red' }}>{paymentStatus.message}</p>
          )}
        </div>
      )}
    </div>
  );
};

const PaymentWrapper = () => (
  <Elements stripe={stripePromise}>
    <Payment />
  </Elements>
);

export default PaymentWrapper;
