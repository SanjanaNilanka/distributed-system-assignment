import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import {
  Alert,
  Box,
  Button,
  FormLabel,
  Grid,
  MenuItem,
  OutlinedInput,
  Select,
  Snackbar,
  Toolbar,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
  marginBottom: "0.5rem",
}));

const stripePromise = loadStripe(
  "pk_test_51PDpiZP9aYeGaiLJZahRQZQCb1nhCZLQbZVHaJsGlhvUxdza4PdGzlhCuJE04TJveyyQQMZM3qyRsxLWOoezgm6l00NxP3X15D"
);

const Payment = () => {
  const [userId, setUserId] = useState("123");
  const [courseId, setCourseId] = useState("456");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [amount, setAmount] = useState(localStorage.getItem("price"));
  const [currency, setCurrency] = useState("USD");

  const [paymentStatus, setPaymentStatus] = useState(null);

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const navigate = useNavigate();

  const handlePayment = async () => {
    try {
      const response = await axios.post(
        "http://localhost:2000/payments/processPayment",
        {
          userId,
          courseId,
          amount,
          currency,
          paymentType: "Card",
          firstName,
          lastName,
          address1,
          address2,
          city,
          state,
          zip,
          country,
        }
      );

      const clientSecret = response.data.clientSecret;

      //const transactionId = response.data.id;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      console.log(result);

      if (result.error) {
        console.log(result.error);
        setPaymentStatus({ success: false, message: result.error.message });
      } else if (result.paymentIntent.status === "succeeded") {
        setPaymentStatus({ success: true, message: "Payment succeeded" });
        setOpenSnackbar(true);
        navigate("/paymentSuccess");
        //navigate(`/getPayment/${transactionId}`);
      }
    } catch (error) {
      console.error(error);
      setPaymentStatus({
        success: false,
        message: error.response?.data?.error || "Payment failed",
      });
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <>
      <Toolbar/>
      <Box
        mt={4}
        mb={4}
        mx={"auto"}
        width="75%"
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormGrid>
                  <FormLabel htmlFor="first-name" required>
                    First name
                  </FormLabel>
                  <OutlinedInput
                    id="first-name"
                    name="first-name"
                    value={firstName}
                    type="name"
                    placeholder="John"
                    onChange={(e) => setFirstName(e.target.value)}
                    autoComplete="first name"
                    required
                  />
                </FormGrid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormGrid>
                  <FormLabel htmlFor="last-name" required>
                    Last name
                  </FormLabel>
                  <OutlinedInput
                    id="last-name"
                    name="last-name"
                    value={lastName}
                    type="last-name"
                    placeholder="Snow"
                    onChange={(e) => setLastName(e.target.value)}
                    autoComplete="last name"
                    required
                  />
                </FormGrid>
              </Grid>
            </Grid>

            <FormGrid>
              <FormLabel htmlFor="address1" required>
                Address line 1
              </FormLabel>
              <OutlinedInput
                id="address1"
                name="address1"
                value={address1}
                type="address1"
                placeholder="Street name and number"
                onChange={(e) => setAddress1(e.target.value)}
                autoComplete="shipping address-line1"
                required
              />
            </FormGrid>

            <FormGrid>
              <FormLabel htmlFor="address2">Address line 2</FormLabel>
              <OutlinedInput
                id="address2"
                name="address2"
                value={address2}
                type="address2"
                placeholder="Apartment, suite, unit, etc. (optional)"
                onChange={(e) => setAddress2(e.target.value)}
                autoComplete="shipping address-line2"
              />
            </FormGrid>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormGrid>
                  <FormLabel htmlFor="city">City</FormLabel>
                  <OutlinedInput
                    id="city"
                    name="city"
                    value={city}
                    type="city"
                    placeholder="New York"
                    onChange={(e) => setCity(e.target.value)}
                    autoComplete="City"
                  />
                </FormGrid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormGrid>
                  <FormLabel htmlFor="state">State</FormLabel>
                  <OutlinedInput
                    id="state"
                    name="state"
                    value={state}
                    type="state"
                    placeholder="NY"
                    onChange={(e) => setState(e.target.value)}
                    autoComplete="State"
                  />
                </FormGrid>
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormGrid>
                  <FormLabel htmlFor="zip" required>
                    Zip / Postal code
                  </FormLabel>
                  <OutlinedInput
                    id="zip"
                    name="zip"
                    value={zip}
                    type="zip"
                    placeholder="12345"
                    onChange={(e) => setZip(e.target.value)}
                    autoComplete="shipping postal-code"
                    required
                  />
                </FormGrid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormGrid>
                  <FormLabel htmlFor="country">Country</FormLabel>
                  <OutlinedInput
                    id="country"
                    name="country"
                    value={country}
                    type="country"
                    placeholder="United States"
                    onChange={(e) => setCountry(e.target.value)}
                    autoComplete="shipping country"
                  />
                </FormGrid>
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormGrid>
                  <FormLabel htmlFor="amount" required>
                    Amount
                  </FormLabel>
                  <OutlinedInput
                    id="amount"
                    name="amount"
                    value={amount}
                    type="number"
                    placeholder="49.99$"
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    readOnly
                  />
                </FormGrid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormGrid>
                  <FormLabel htmlFor="currency" required>
                    Currency
                  </FormLabel>
                  <Select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    required
                    style={{ marginBottom: "1rem" }}
                  >
                    <MenuItem value="USD">USD</MenuItem>
                    <MenuItem value="EUR">EUR</MenuItem>
                    <MenuItem value="GBP">GBP</MenuItem>{" "}
                  </Select>
                </FormGrid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                marginTop: 1,
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  p: 5,
                  height: { xs: 150, sm: 150, md: 150 },
                  width: "100%",
                  borderRadius: "20px",
                  border: "1px solid ",
                  borderColor: "divider",
                  backgroundColor: "background.paper",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.05)",
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="subtitle2">Credit card</Typography>
                  <CreditCardRoundedIcon sx={{ color: "text.secondary" }} />
                </Box>

                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#424770",
                        "::placeholder": {
                          color: "#aab7c4",
                        },
                      },
                      invalid: {
                        color: "#9e2146",
                      },
                    },
                  }}
                />
              </Box>
              <Button
                variant="contained"
                color="primary"
                onClick={handlePayment}
                style={{ marginTop: "1rem" }}
              >
                Make Payment
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={
            paymentStatus && paymentStatus.success ? "success" : "error"
          }
        >
          {paymentStatus && paymentStatus.message}
        </Alert>
      </Snackbar>
    </>
  );
};

const PaymentWrapper = () => (
  <Elements stripe={stripePromise}>
    <Payment />
  </Elements>
);

export default PaymentWrapper;
