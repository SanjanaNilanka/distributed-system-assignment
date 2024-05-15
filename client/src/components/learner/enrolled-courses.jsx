import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Grid,
  Button,
  Typography,
  Card,
  CardMedia,
  CardContent,
  TextField,
  InputAdornment,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Toolbar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const EnrolledCourses = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [courseIdToRemove, setCourseIdToRemove] = useState(null);

  const fetchEnrolledCourses = async () => {
    try {
      const _id = "2217793";
      const response = await axios.get(`http://localhost:5001/learner/${_id}`);
      const enrolledCourses = response.data.enrolledCourses;

      if (enrolledCourses.length === 0) {
        console.error("No enrolled courses found");
        return;
      }

      const courseDetailsPromises = enrolledCourses.map((course) => {
        return axios.get(`http://localhost:5000/course/get/${course.courseId}`);
      });

      const courseDetailsResponses = await Promise.all(courseDetailsPromises);

      const combinedCourses = enrolledCourses.map((course, index) => {
        const courseDetails = courseDetailsResponses[index].data;
        const totalLessons = courseDetails.course.outline.reduce(
          (total, outlineItem) => {
            return (
              total + (outlineItem.lessons ? outlineItem.lessons.length : 0)
            );
          },
          0
        );
        const lectureTitles = courseDetails.course.outline.map(
          (item) => item.lectureTitle
        );
        const teachersNotes = courseDetails.course.outline.reduce(
          (allNotes, outlineItem) => {
            if (outlineItem.teachersNote) {
              return [...allNotes, ...outlineItem.teachersNote];
            }
            return allNotes;
          },
          []
        );
        return {
          ...course,
          courseId: courseDetails.course._id,
          title: courseDetails.course.title,
          description: courseDetails.course.description,
          status: courseDetails.course.status,
          thumbnail: courseDetails.course.thumbnail,
          totalLessons: totalLessons,
          category: courseDetails.course.category,
          subCategory: courseDetails.course.subCategory,
          lessons: courseDetails.course.outline.reduce(
            (lessonArray, outlineItem) => {
              if (outlineItem.lessons) {
                return [...lessonArray, ...outlineItem.lessons];
              }
              return lessonArray;
            },
            []
          ),
          lectureTitles: lectureTitles,
          teachersNotes: teachersNotes,
          details: courseDetails.course,
        };
      });

      setCourses(combinedCourses);
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
    }
  };

  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  const handleUnenroll = async () => {
    try {
      const _id = "2217793";

      const response = await axios.delete(
        `http://localhost:5001/learner/${_id}`,
        {
          data: { courseId: courseIdToRemove },
        }
      );

      console.log(response.data.message); // Log success message
      fetchEnrolledCourses(); // Refresh the enrolled courses after unenrollment
      setConfirmDialogOpen(false); // Close the confirmation dialog
    } catch (error) {
      console.error("Error unenrolling:", error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleOpenConfirmDialog = (courseId) => {
    setCourseIdToRemove(courseId);
    setConfirmDialogOpen(true);
  };

  const handleCloseConfirmDialog = () => {
    setConfirmDialogOpen(false);
  };

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: "16px", paddingTop: "20px", textAlign: "center" }}>
      <Toolbar/>
      <TextField
        placeholder="Search"
        variant="outlined"
        size="small"
        onChange={handleSearch}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        style={{ marginBottom: "20px" }}
      />
      <Grid container spacing={4} justifyContent="center">
        {filteredCourses.map((course) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={course.courseId}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardMedia
                component="img"
                height="200"
                width="200"
                image={course.thumbnail}
                alt={course.title}
              />
              <CardContent style={{ flexGrow: 1 }}>
                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <Typography gutterBottom variant="h5" component="div">
                      {course.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {course.description}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Category: {course.category}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Total Lessons: {course.totalLessons}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Status: {course.status}
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "auto",
                    }}
                  >
                    <Link
                      to={`/courses/${course.courseId}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Button
                        variant="contained"
                        style={{ marginRight: "8px" }}
                      >
                        Continue
                      </Button>
                    </Link>

                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleOpenConfirmDialog(course.courseId)}
                    >
                      Unenroll
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialogOpen}
        onClose={handleCloseConfirmDialog}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <DialogTitle id="confirm-dialog-title">
          Confirm Unenrollment
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            Are you sure you want to unenroll from this course?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog}>Cancel</Button>
          <Button onClick={handleUnenroll} color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EnrolledCourses;
