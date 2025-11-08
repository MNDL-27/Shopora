import nodemailer from 'nodemailer';
import i18next from '../i18n.js';

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
const sendOrderConfirmation = async (email, orderDetails, lng = 'en') => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `${i18next.t('email.orderConfirmationSubject', { lng })} - Shopora`,
      html: `
        <h1>${i18next.t('email.orderReceived', { lng })}</h1>
        <p>Order ID: ${orderDetails._id}</p>
        <p>Total: $${orderDetails.totalPrice}</p>
        <p>${i18next.t('email.willNotifyOnShip', { lng, defaultValue: "We'll send you a shipping confirmation email as soon as your order ships." })}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    // Silent fail - log in production monitoring
  }
};

// Send order shipped email
const sendOrderShipped = async (email, orderDetails, lng = 'en') => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `${i18next.t('email.orderShippedSubject', { lng, defaultValue: 'Your Order Has Been Shipped' })} - Shopora`,
      html: `
        <h1>${i18next.t('email.orderShippedTitle', { lng, defaultValue: 'Your order is on its way!' })}</h1>
        <p>Order ID: ${orderDetails._id}</p>
        <p>${i18next.t('email.orderShippedBody', { lng, defaultValue: 'Your order has been shipped and should arrive soon.' })}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    // Silent fail - log in production monitoring
  }
};

export { sendOrderConfirmation, sendOrderShipped };
