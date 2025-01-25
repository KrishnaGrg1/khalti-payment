# Subscription Payment System with Khalti

This project implements a subscription-based payment system using **Khalti** as the payment gateway. It allows users to select a subscription plan and complete the payment via Khalti, after which the payment status is verified.

## Features

- **Subscription Plan Selection**: Users can choose a subscription plan.
- **Khalti Payment Integration**: Payments are processed through Khalti's API.
- **Payment Verification**: After payment, the status is verified and the user is shown a success or failure message.
- **Responsive UI**: A user-friendly and responsive UI is provided for seamless interaction.

---

## Prerequisites

- **Node.js**: Ensure you have Node.js (v12 or higher) installed on your system.
- **MongoDB**: A MongoDB instance is required for storing subscription plans and payment records.
- **Khalti Account**: You need to set up a Khalti account to get your API keys (for payment processing).

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/khalti-subscription-payment.git
cd khalti-subscription-payment


### 2. Install dependencies
Run the following command to install all required dependencies:

```bash
npm install

### 3. Setup environment variables
Create a .env file in the root directory and configure the following environment variables:

```dotenv
MONGO_URI=mongodb://localhost:27017/your_database_name  # MongoDB connection string
KHALTI_API_KEY=your_khalti_api_key                     # Khalti API key
BACKEND_URI=http://localhost:5000                       # Backend server URL
FRONTEND_URI=http://localhost:3000                      # Frontend URL
Replace your_khalti_api_key with the API key from your Khalti account.

### 4. Start the server
```bash
npm start
Your server should now be running at http://localhost:5000.