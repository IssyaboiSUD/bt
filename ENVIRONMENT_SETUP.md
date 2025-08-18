# 🌍 Environment Variables Setup for Vercel Deployment

## Required Environment Variables

Add these to your Vercel project settings:

### Database
```
DATABASE_URL=file:./dev.db
```
**Note**: For production, use PostgreSQL instead of SQLite

### Stripe
```
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

### Email (SMTP)
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password_here
ADMIN_EMAIL=admin@bayreuth-apartments.de
```

## How to Add in Vercel:

1. Go to your Vercel project dashboard
2. Click on "Settings"
3. Go to "Environment Variables"
4. Add each variable one by one
5. Make sure to set them for "Production" environment
6. Redeploy your project

## Important Notes:

- **Database**: The current setup uses SQLite which works for development but not for production
- **Stripe**: Use test keys first, then switch to live keys when ready
- **Email**: Gmail requires an "App Password" for SMTP
- **Webhook**: Set Stripe webhook URL to: `https://yourdomain.vercel.app/api/webhooks/stripe`
