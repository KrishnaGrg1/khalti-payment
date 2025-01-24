import catchAsync from "../helpers/catchAsync.js";
import SubscriptionPlan from "../models/subscriptionPlan.js";
import PurchasedPlan from "../models/purchased.js";
import khaltifunction from "../services/khalti.js";
import Payment from "../models/payment.js";

const initiatePayment = catchAsync(async (req, res) => {
  const { planid, paymentMethod } = req.body;

  // Check if subscription plan exists
  const existingsubscriptionPlan = await SubscriptionPlan.findOne({
    _id: planid
  });
  if (!existingsubscriptionPlan) {
    throw new Error("Subscription Plan not found");
  }

  // Check if the payment method is Khalti
  if (paymentMethod !== "khalti") {
    throw new Error("Other payment methods are not available");
  }

  // Create the purchased plan in the database
  const purchasedPlan = await PurchasedPlan.create({
    plan_id: planid,
    totalPrice: existingsubscriptionPlan.price*100,
    paymentMethod: paymentMethod
  });

  // Initialize Khalti payment
  try {
    const paymentInitate = await khaltifunction.initializeKhaltiPayment({
      amount: existingsubscriptionPlan.price*100, // amount should be in paisa (Rs * 100)
      purchase_order_id: purchasedPlan._id, // purchase_order_id to verify later
      purchase_order_name: existingsubscriptionPlan.plan_name,
      return_url: `${process.env.BACKEND_URI}/payment/verify`, // return URL for the redirect

      website_url: `${process.env.FRONTEND_URI}` // the website URL
    });

    // Return the success response
    res.json({
      success: true,
      purchasedPlan,
      payment: paymentInitate
    });
  } catch (error) {
    // Handle error during Khalti payment initialization
    console.error("Error initializing Khalti payment:", error.message || error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to initialize payment"
    });
  }
});

const completepayment = catchAsync(async (req, res) => {
  const {
    pidx,
    txnId,
    amount,
    mobile,
    purchase_order_id,
    purchase_order_name,
    transaction_id
  } = req.query;
  try {
    const paymentInfo = await khaltifunction.verifyPayment(pidx);
    // Check if payment is completed and details match
    if (
      paymentInfo?.status !== "Completed" ||
      paymentInfo.transaction_id !== transaction_id ||
      Number(paymentInfo.total_amount) !== Number(amount)
    ) {
      return res.status(400).json({
        success: false,
        message: "Incomplete information",
        paymentInfo
      });
    }
    const purchasePlan = await PurchasedPlan.findOne({
      _id: purchase_order_id,
      totalPrice: amount
    });
    if (!purchasePlan) {
      return res.status(400).send({
        success: false,
        message: "Purchased data not found"
      });
    }
    purchasePlan.status = "completed";
    await purchasePlan.save();

    const paymentData = await Payment.create({
      pidx,
      transactionId: transaction_id,
      productId: purchase_order_id,
      amount,
      dataFromVerificationReq: paymentInfo,
      apiQueryFromUser: req.query,
      paymentGateway: "khalti",
      status: "success"
    });
    res.json({
      success: true,
      message: "Payment Successful",
      paymentData
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred",
      error
    });
  }
});

const paymentController = {
  initiatePayment,completepayment
};

export default paymentController;
