/**
 * File: payments.js
 * Purpose: Stub configuration for StudentsAI payment integration with Stripe
 * Location: src/studentsai/config/
 */

export const Payments = {
  provider: 'Stripe',
  earlyBirdPrice: 29,
  prelaunchPrice: 59,
  launchOfferPrice: 99,
  regularPrice: 199,
  currency: 'GBP',
  testKey: process.env.STRIPE_TEST_KEY || '',
};
