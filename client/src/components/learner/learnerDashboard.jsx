import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Paper, CircularProgress, Box } from "@mui/material"; 

function LearnerProfile() {
  const [learnerDetails, setLearnerDetails] = useState(null); 
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLearnerDetails = async () => {
      try {
        const learnerId = "2217793";
        const response = await axios.get(
          `http://localhost:5001/learner/${learnerId}`
        );
        setLearnerDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching learner details:", error);
        setError("Failed to fetch learner details. Please try again later.");
        setLoading(false);
      }
    };

    fetchLearnerDetails();
  }, []);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Box p={4} maxWidth={600}>
        <Typography variant="h3" gutterBottom style={{ textAlign: 'center', marginBottom: 32 }}>
          My Profile
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Paper elevation={3} style={{ padding: 16 }}>
            <Typography variant="body1" color="error" style={{ fontSize: 20 }}>
              {error}
            </Typography>
          </Paper>
        ) : (
          learnerDetails && (
            <Paper elevation={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 7}}>
              <img src={learnerDetails.learner_pic} alt="Learner Pic" style={{ width: 200, height: 200, borderRadius: '50%', marginBottom: 32 }} />
              <Typography variant="h4" gutterBottom style={{ fontSize: 24 }}>
                Name: {learnerDetails.name}
              </Typography>
              <Typography variant="body1" gutterBottom style={{ fontSize: 20 }}>
                ID: {learnerDetails._id}
              </Typography>
              <Typography variant="body1" gutterBottom style={{ fontSize: 20 }}>
                Bio: {learnerDetails.bio}
              </Typography>
              <Typography variant="body1" gutterBottom style={{ fontSize: 20 }}>
                Email: {learnerDetails.email}
              </Typography>
            </Paper>
          )
        )}
      </Box>
    </Box>
  );
}

export default LearnerProfile;
