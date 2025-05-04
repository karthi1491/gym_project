import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Payment = () => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  // For demonstration, static order details similar to Zomato's style
  const orderDetails = {
    restaurantName: 'KAOB Fitness',
    items: [
      { name: '1 Month Membership', qty: 1, price: amount || 0 },
    ],
    subtotal: amount || 0,
    taxes: ((amount || 0) * 0.18).toFixed(2),
    total: (amount ? (Number(amount) * 1.18).toFixed(2) : 0),
  };

  useEffect(() => {
    // If amount is empty, reset to empty string
    if (!amount) setAmount('');
  }, [amount]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const [selectedMethod, setSelectedMethod] = React.useState('upi');

  const handlePayment = async () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    setLoading(true);

    const res = await loadRazorpayScript();

    if (!res) {
      toast.error('Failed to load Razorpay SDK. Are you online?');
      setLoading(false);
      return;
    }

    try {
      // Create order on backend
      const orderResponse = await axios.post('http://localhost:4000/user/payment/order', { amount: Number(amount) });
      const { id: order_id, currency } = orderResponse.data;

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID || '', // Add your Razorpay key here or in env
        amount: Number(amount) * 100,
        currency: currency || 'INR',
        name: 'Zomato Fitness',
        description: 'Membership Payment',
        order_id: order_id,
        handler: async function (response) {
          try {
            // Verify payment on backend
            const verifyResponse = await axios.post('http://localhost:4000/user/payment/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyResponse.status === 200) {
              toast.success('Payment successful!');
              setAmount('');
            } else {
              toast.error('Payment verification failed.');
            }
          } catch (error) {
            toast.error('Payment verification error.');
          }
        },
        prefill: {
          name: 'Zomato User',
          email: 'user@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#d32323', // Zomato red color
        },
        modal: {
          ondismiss: function() {
            toast.info('Payment popup closed.');
          },
          escape: true,
          backdropclose: false,
        },
        // Enable multiple payment methods like Zomato
        method: {
          netbanking: true,
          card: true,
          upi: true,
          wallet: true,
          emi: false,
          paylater: false,
        },
        // Pass selected payment method to Razorpay options
        method: selectedMethod,
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      toast.error('Server error. Please try again later.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-5xl w-full bg-white rounded-lg shadow-lg flex overflow-hidden">
        {/* Left: Order Summary */}
        <div className="w-1/2 p-8 border-r border-gray-200">
          <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
          <div className="mb-4">
            <h3 className="text-lg font-medium">{orderDetails.restaurantName}</h3>
            <p className="text-sm text-gray-500">Membership Purchase</p>
          </div>
          <div className="space-y-4">
            {orderDetails.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                </div>
                <p className="font-semibold">₹{item.price}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-300 mt-6 pt-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span>₹{orderDetails.subtotal}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Taxes & Charges (18%)</span>
              <span>₹{orderDetails.taxes}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{orderDetails.total}</span>
            </div>
          </div>
        </div>

        {/* Right: Payment Section */}
        <div className="w-1/2 p-8">
          <h2 className="text-2xl font-semibold mb-6">Payment</h2>
          <label htmlFor="amount" className="block text-gray-700 mb-2 font-medium">
            Enter Amount
          </label>
          <input
            id="amount"
            type="number"
            placeholder="₹0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-red-500"
            disabled={loading}
          />
          {/* Payment method selection UI */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2 font-medium">Select Payment Method</label>
            <div className="flex space-x-4">
              <button
                type="button"
                className={`px-4 py-2 rounded border ${
                  selectedMethod === 'upi' ? 'border-red-600 bg-red-100' : 'border-gray-300'
                }`}
                onClick={() => setSelectedMethod('upi')}
                disabled={loading}
              >
                UPI (PhonePe, GPay)
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded border ${
                  selectedMethod === 'card' ? 'border-red-600 bg-red-100' : 'border-gray-300'
                }`}
                onClick={() => setSelectedMethod('card')}
                disabled={loading}
              >
                Credit/Debit Card
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded border ${
                  selectedMethod === 'wallet' ? 'border-red-600 bg-red-100' : 'border-gray-300'
                }`}
                onClick={() => setSelectedMethod('wallet')}
                disabled={loading}
              >
                Wallet
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded border ${
                  selectedMethod === 'netbanking' ? 'border-red-600 bg-red-100' : 'border-gray-300'
                }`}
                onClick={() => setSelectedMethod('netbanking')}
                disabled={loading}
              >
                Net Banking
              </button>
            </div>
          </div>
          <button
            onClick={handlePayment}
            disabled={loading}
            className={`w-full bg-red-600 text-white py-3 rounded font-semibold hover:bg-red-700 transition-colors ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Processing...' : 'Pay Now'}
          </button>
          <p className="mt-4 text-sm text-gray-500">
            You will be redirected to a secure payment gateway to complete your purchase.
          </p>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default Payment;
