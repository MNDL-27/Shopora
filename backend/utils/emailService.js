import nodemailer from 'nodemailer';

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send order confirmation email
const sendOrderConfirmation = async (email, orderDetails) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Order Confirmation - Shopora',
      html: `
        <h1>Thank you for your order!</h1>
        <p>Order ID: ${orderDetails._id}</p>
        <p>Total: $${orderDetails.totalPrice}</p>
        <p>We'll send you a shipping confirmation email as soon as your order ships.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Order confirmation email sent');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Send order shipped email
const sendOrderShipped = async (email, orderDetails) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your Order Has Been Shipped - Shopora',
      html: `
        <h1>Your order is on its way!</h1>
        <p>Order ID: ${orderDetails._id}</p>
        <p>Your order has been shipped and should arrive soon.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Order shipped email sent');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export { sendOrderConfirmation, sendOrderShipped };
