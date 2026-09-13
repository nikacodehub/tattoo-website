# Tattoo Website
Personal portfolio website for a tattoo artist.

# Technologies
-React
-React Router
-CSS

## Features
-Responsive design
-Portfolio gallery
-Booking Page
-Flash designs page
-Contact section

## Status
Work in progress

## Run locally
```bash
npm install
npm start
```

## Cloudflare Worker deployment

This project deploys to the existing public `tattoo-website` Cloudflare Worker. It is not a Cloudflare Pages project.

The React app is built into `build/` and served by Worker Static Assets. The public Worker handles `/api/booking` and forwards booking submissions to the private `tattoo-booking-email` Worker through the `BOOKING_EMAIL_WORKER` service binding.

The separate `tattoo-booking-email` Worker owns the Cloudflare Email binding:

- recipient: `info.nikaveratattoo@gmail.com`
- sender: `bookings@nikaveratattoo.com`

Reference image uploads are accepted as JPG, PNG, GIF, or WebP files up to 5MB and are attached to the booking email.

Build and deploy the public Worker:

```bash
npm run build
npx wrangler deploy
```
