import React from "react";
import { Card, Container, Link, Toolbar, Typography } from "@mui/material";

const PaymentSuccess = () => {
  return (
    <div >
      <Toolbar />
      <Container style={{height:'100vh', display:'flex', alignItems:'center', justifyContent:'center'}}>
        <Card sx={{padding:10, display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap: 3}} >
          <Typography variant="h3" >Payment Successful!</Typography>
          <Link href='/enrolled-courses'>Continue { ">" }</Link>
        </Card>
        
      </Container>
      
    </div>
  );
};

export default PaymentSuccess;
