# Quick Reaction Food Force (QRFF)

QRFF is a rapid-response food relief organization based in Los Angeles, dedicated to providing immediate, high-quality meals to those facing crisis situations. Our platform connects professional chefs and restaurants with communities in need, ensuring swift and effective food distribution.

## Mission

We mobilize chefs and restaurants to provide immediate, hot, nutritious meals to those facing crisis. Our rapid response model ensures quality food reaches those who need it most, when they need it most.

## Features

- **Rapid Response System**: Mobilizing within hours for crisis situations
- **Chef-Led Quality**: Professional chefs ensuring nutritious and delicious meals
- **Community Impact**: Strategic partnerships with local organizations
- **QR Code Donations**: Easy-to-use digital donation system
- **Event Management**: Hosting fundraisers and community events
- **Partner Network**: Collaboration with local restaurants and food suppliers

## Tech Stack

- **Framework**: Next.js 15.2 (with TypeScript)
- **Styling**: Tailwind CSS
- **UI Components**: 
  - Radix UI primitives
  - Custom components (Button, Card, Dialog, etc.)
- **Animations**: Framer Motion
- **Development Tools**: 
  - ESLint
  - TypeScript
  - Turbopack

## Environment Variables

This project uses environment variables to securely manage API keys and sensitive configuration. To run the project locally, you'll need to set up the following environment variables:

1. Create a `.env.local` file in the root directory with the following variables:

```
# Screenshot Machine API Key (used server-side only)
SCREENSHOT_API_KEY=your_api_key_here
```

### Security Notes

- **NEVER commit API keys or sensitive information directly in the code**
- All `.env*` files are gitignored to prevent accidental exposure of secrets
- For production deployment, set environment variables in your hosting platform (Vercel, Netlify, etc.)
- Be aware that any environment variable prefixed with `NEXT_PUBLIC_` will be exposed to the browser
- For truly sensitive operations, consider using server-side API routes instead of client-side calls

### Third-Party Services

- **Screenshot Machine**: Used for generating website previews. Requires an API key which can be obtained from [Screenshot Machine](https://www.screenshotmachine.com/).

## Demo
Available here:

## License

Private - All rights reserved
