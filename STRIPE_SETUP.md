# Stripe Integration Setup Guide

## 🔧 Environment Variables

Create a `.env.local` file in your project root and add the following:

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Database Configuration  
DATABASE_URL="postgresql://username:password@localhost:5432/bayreuth_apartments"

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
ADMIN_EMAIL=admin@bayreuth-apartments.de
```

## 🏗️ Getting Your Stripe Keys

### 1. Create a Stripe Account
- Go to [https://stripe.com](https://stripe.com)
- Sign up for a free account
- Complete the account verification

### 2. Get API Keys
- In your Stripe Dashboard, go to **Developers > API Keys**
- Copy your **Publishable key** (starts with `pk_test_`)
- Copy your **Secret key** (starts with `sk_test_`)

### 3. Set Up Webhooks
- Go to **Developers > Webhooks** in your Stripe Dashboard
- Click **Add endpoint**
- Set the endpoint URL to: `https://yourdomain.com/api/webhooks/stripe`
- Select these events:
  - `payment_intent.succeeded`
  - `payment_intent.payment_failed`
- Copy the **Signing secret** (starts with `whsec_`)

## 🚀 Testing the Integration

### Test Card Numbers
Use these test card numbers in development:

- **Successful payment**: `4242 4242 4242 4242`
- **Declined payment**: `4000 0000 0000 0002`
- **Requires authentication**: `4000 0025 0000 3155`

### Test Details
- **Expiry**: Any future date (e.g., `12/25`)
- **CVC**: Any 3-digit number (e.g., `123`)
- **Name**: Any name

## 🔄 How It Works

1. **User fills booking form** → Redirects to payment page
2. **Payment page loads** → Creates Stripe Elements
3. **User enters card details** → Validates on client-side
4. **Form submission** → Creates PaymentIntent via API
5. **Stripe processes payment** → Sends webhook to your server
6. **Webhook handler** → Saves booking to database & sends emails
7. **Success page** → Shows confirmation to user

## 📊 Stripe Dashboard

Monitor your payments in the Stripe Dashboard:
- **Payments**: View all transactions
- **Customers**: Manage customer data
- **Disputes**: Handle chargebacks
- **Reports**: Financial analytics

## 🔒 Security Features

✅ **PCI Compliance**: Stripe handles card data securely
✅ **SCA Ready**: Supports Strong Customer Authentication
✅ **Fraud Detection**: Built-in fraud prevention
✅ **Webhooks**: Secure event notifications
✅ **SSL Required**: All communications encrypted

## 🛠️ Customization

### Styling
The payment form uses your existing CSS classes and can be customized in:
- `app/components/StripePaymentForm.tsx`
- `app/globals.css` (for Stripe Elements styling)

### Payment Methods
Currently supports:
- Credit/Debit Cards
- Can be extended to support: PayPal, Apple Pay, Google Pay, SEPA, etc.

### Currency
Currently set to EUR (€) but can be changed in:
- `app/api/create-payment-intent/route.ts`

## 🚨 Production Checklist

Before going live:
- [ ] Replace test keys with live keys
- [ ] Set up live webhook endpoint
- [ ] Configure proper error handling
- [ ] Set up database for booking storage
- [ ] Configure email notifications
- [ ] Test with real cards (small amounts)
- [ ] Set up monitoring and logging

## 💡 Next Steps

1. **Database Integration**: Save bookings to PostgreSQL
2. **Email Notifications**: Send confirmation emails
3. **Calendar Sync**: Update availability calendars
4. **Admin Dashboard**: Manage bookings and payments
5. **Refund System**: Handle cancellations and refunds
