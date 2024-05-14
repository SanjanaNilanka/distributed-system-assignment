import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Typography,
  Container,
  Grid,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const CoursePage = () => {
  const course = JSON.parse(localStorage.getItem("courseData"));
  const [checkedLessons, setCheckedLessons] = useState([]);
  const [totalProgress, setTotalProgress] = useState(0); // State to track total progress
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    // Calculate total progress when checkedLessons changes
    const calculateTotalProgress = () => {
      const totalLessons = course.lessons.length;
      const completedLessons = checkedLessons.length;
      const progress = (completedLessons / totalLessons) * 100;
      setTotalProgress(progress);
    };

    calculateTotalProgress();
  }, [checkedLessons, course.lessons]);

  const handleCheckboxChange = (lessonId) => {
    setCheckedLessons((prevCheckedLessons) => {
      // Check if the lessonId is already in checkedLessons
      const isChecked = prevCheckedLessons.includes(lessonId);

      // If the checkbox is already checked, remove it from the checkedLessons
      if (isChecked) {
        return prevCheckedLessons.filter((id) => id !== lessonId);
      } else {
        // If the checkbox is not checked, add it to the checkedLessons
        return [...prevCheckedLessons, lessonId];
      }
    });
  };

  return (
    <Container maxWidth="xl" style={{ padding: "40px" }}>
      <Grid container spacing={6}>
        {/* Course details and Thumbnail */}
        <Grid item xs={12}>
          <div
            style={{
              backgroundColor: "#f5f5f5",
              padding: "20px",
              borderRadius: "5px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              <Typography
                variant="h2"
                gutterBottom
                style={{ fontSize: "40px", fontWeight: "bold" }}
              >
                {course.title}
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                style={{ fontSize: "22px", fontWeight: "medium" }}
              >
                {course.description}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                gutterBottom
                style={{ fontSize: "16px" }}
              >
                Category: {course.category}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                gutterBottom
                style={{ fontSize: "16px" }}
              >
                Total Lessons: {course.lessons.length}
              </Typography>
            </div>
            <div>
              <img
                src={course.thumbnail}
                alt="Course Thumbnail"
                style={{
                  maxWidth: "400px",
                  maxHeight: "400px",
                  borderRadius: "5px",
                }}
              />
            </div>
          </div>
        </Grid>

        {/* Back button */}
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(`/enrolled-Courses`)}
          >
            Back to Enrollments
          </Button>
        </Grid>

        {/* Total Progress */}
        <Grid item xs={12}>
          <LinearProgress
            variant="determinate"
            value={totalProgress}
            style={{ marginTop: "20px", width: "100%" }}
          />
          <Typography
            variant="body2"
            color="textSecondary"
            align="center"
            style={{ marginTop: "10px" }}
          >
            Total Progress: {totalProgress.toFixed(2)}%
          </Typography>
        </Grid>

        {/* Chapters Table */}
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Chapters
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Lecture No</TableCell>
                  <TableCell>Lecture Title</TableCell>
                  <TableCell>Teacher's Note</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {course.lessons.map((lesson, index) => (
                  <TableRow
                    key={index}
                    style={{
                      backgroundColor: checkedLessons.includes(lesson.lessonId)
                        ? "#c8e6c9"
                        : "inherit",
                    }}
                  >
                    <TableCell>
                      <Checkbox
                        checked={checkedLessons.includes(lesson.lessonId)}
                        onChange={() => handleCheckboxChange(lesson.lessonId)}
                        sx={{ width: "100%", height: "40px", margin: "8px 0" }}
                      />
                    </TableCell>
                    <TableCell>{lesson.lectureNo}</TableCell>
                    <TableCell>{lesson.lessonTitle}</TableCell>
                    <TableCell>
                      {lesson.teachersNote &&
                        lesson.teachersNote.map((note, index) => (
                          <div key={index}>{note}</div>
                        ))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CoursePage;
