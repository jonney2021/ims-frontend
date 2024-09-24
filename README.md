# Inventory Management System - Frontend

This is the frontend application for the Inventory Management System, built with React and Redux.

## Features

- Dashboard with overview of inventory status
- Item management (add, edit, delete, view details)
- Category management
- User management
- Search and filter functionality
- Responsive design

## Technologies Used

- React
- Redux Toolkit
- React Router
- Axios for API calls
- Tailwind CSS for styling
- Vite for build tooling and development server
- React Paginate for pagination
- Cloudinary for image uploads

## Prerequisites

- Node.js
- npm or yarn

## Setup and Installation

1. Clone the repository:

   ```
   git clone https://github.com/jonney2021/ims-frontend.git
   cd ims-frontend
   ```

2. Install dependencies:

   ```
   npm install
   ```

   or if you're using yarn:

   ```
   yarn install
   ```

3. Create a `.env` file in the root directory and add the following:

   ```
   VITE_API_BASE_URL=http://localhost:5000
   ```

   Replace the URL with your backend server URL if different.

4. Start the development server:
   ```
   npm run dev
   ```
   or
   ```
   yarn dev
   ```

## Available Scripts

- `npm run dev` or `yarn dev`: Runs the app in development mode
- `npm run build` or `yarn build`: Builds the app for production
- `npm run lint` or `yarn lint`: Runs the linter
