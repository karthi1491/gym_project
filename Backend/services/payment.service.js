 import Razorpay from 'razorpay';
 import dotenv from 'dotenv';
dotenv.config();


 console.log('RAZORPAY_KEY_ID:', process.env.RAZORPAY_KEY_ID);
console.log('RAZORPAY_KEY_SECRET:', process.env.RAZORPAY_KEY_SECRET);


const razorpay = new Razorpay({
  
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
  
});


export const createOrder = async (amount, currency = 'INR') => {
  const options = {
    amount: amount * 100, // amount in paise
    currency,
    receipt: `receipt_order_${Date.now()}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    return order;
  } catch (error) {
    console.error('Razorpay order creation error details:', error);
    throw new Error('Error creating Razorpay order: ' + (error.message || JSON.stringify(error)));
  }
};

export const verifyPayment = (paymentDetails) => {
  // Implement payment signature verification here if needed
  // For simplicity, this can be done in controller using crypto module
  return true;
};
