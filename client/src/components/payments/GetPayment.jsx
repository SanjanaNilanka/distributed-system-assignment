import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const GetPayment = () => {
  const { transactionId } = useParams();
  const [paymentDetails, setPaymentDetails] = useState(null);

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/payments/get/${transactionId}`);
        setPaymentDetails(response.data);
      } catch (error) {
        console.error("Error fetching payment details:", error);
      }
    };

    fetchPaymentDetails();
  }, [transactionId]);

  return (
    <div>
      {paymentDetails && (
        <div>
          <h2>Payment Details</h2>
          <p>Transaction ID: {paymentDetails.transactionId}</p>
        </div>
      )}
    </div>
  );
};

export default GetPayment;
