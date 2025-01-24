// import axios from 'axios';
// import { config } from 'dotenv';

// config();

// // Initialize Khalti Payment
// async function initializeKhaltiPayment(details) {
//   console.log("Khalti Secret Key:", process.env.KHALTI_SECRET_KEY);

//   const headersList = {
//     Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`, // Correct Authorization format
//     "Content-Type": "application/json"
//   };

//   const bodyContent = JSON.stringify(details); // Stringify the details object
//   console.log(bodyContent); // Log the body content for debugging

//   const reqOptions = {
//     url: `${process.env.KHALTI_GATEWAY_URL}/api/v2/epayment/initiate/`,  // Ensure the URL has a trailing slash
//     method: "POST",
//     headers: headersList,
//     data: bodyContent  // Sending the JSON data
//   };

//   try {
//     const response = await axios.request(reqOptions);  // Await the axios request
//     return response.data;  // Return the response from Khalti API
//   } catch (e) {
//     console.error("Error initializing Khalti payment:", e.response ? e.response.data : e.message);
//     throw e;  // Re-throw the error for further handling
//   }
// }

// // Example usage
// const paymentDetails = {
//   "return_url": "http://example.com/",
//   "website_url": "https://example.com/",
//   "amount": "1000",
//   "purchase_order_id": "Order01",
//   "purchase_order_name": "test",
//   "customer_info": {
//     "name": "Ram Bahadur",
//     "email": "test@khalti.com",
//     "phone": "9800000001"
//   }
// };

// initializeKhaltiPayment(paymentDetails)
//   .then(response => {
//     console.log("Khalti Payment Response:", response);
//   })
//   .catch(error => {
//     console.log("Error in Khalti Payment:", error);
//   });

const pidx="pE9MMeXVPHPznPZ7ZVcuvG"
const bodyContent = JSON.stringify({ pidx });
console.log(bodyContent)