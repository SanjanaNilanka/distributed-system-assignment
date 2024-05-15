import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
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
  const { courseId } = useParams();
  const [checkedLessons, setCheckedLessons] = useState([]);
  const [totalProgress, setTotalProgress] = useState(0);
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!courseId) {
      console.error("courseId is not defined");
      return;
    }

    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/course/get/${courseId}`);
        const courseData = response.data;

        const totalLessons = courseData.course.outline.reduce(
          (total, outlineItem) => {
            return total + (outlineItem.lessons ? outlineItem.lessons.length : 0);
          },
           0
        );

        const lectureTitles = courseData.course.outline.map((item) => item.lectureTitle);
        const teachersNotes = courseData.course.outline.reduce(
          (allNotes, outlineItem) => {
            if (outlineItem.teachersNote) {
              return [...allNotes, ...outlineItem.teachersNote];
            }
            return allNotes;
          },
          []
        );

        const combinedCourse = {
          ...courseData.course,
          totalLessons: totalLessons,
          lectureTitles: lectureTitles,
          teachersNotes: teachersNotes,
          lessons: courseData.course.outline.reduce((lessonArray, outlineItem) => {
            if (outlineItem.lessons) {
              return [...lessonArray, ...outlineItem.lessons];
            }
            return lessonArray;
          }, [])
        };

        setCourse(combinedCourse);
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  const handleCheckboxChange = (lessonId) => {
    setCheckedLessons((prevCheckedLessons) => {
      const isChecked = prevCheckedLessons.includes(lessonId);
      if (isChecked) {
        return prevCheckedLessons.filter((id) => id !== lessonId);
      } else {
        return [...prevCheckedLessons, lessonId];
      }
    });
  };

  useEffect(() => {
    if (course) {
      const completedLessons = checkedLessons.length;
      const progress = (completedLessons / course.totalLessons) * 100;
      setTotalProgress(progress);
    }
  }, [checkedLessons, course]);

  if (!course) {
    return <Typography variant="h4">Loading...</Typography>;
  }

  return (
    <Container maxWidth="xl" style={{ padding: "40px" }}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <div
            style={{
              backgroundColor: "#f5f5f5",
              padding: "20px",
              borderRadius: "5px",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
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
              <div
                style={{
                  backgroundColor: "#e3f2fd",
                  padding: "20px",
                  paddingLeft: "2px",
                  borderRadius: "5px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "45px",
                }}
              >
                <Typography
                  variant="body2"
                  color="textSecondary"
                  gutterBottom
                  style={{ fontSize: "16px" }}
                >
                  Category: {course.category}
                </Typography>
                {course.subCategory && (
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    gutterBottom
                    style={{ fontSize: "16px" }}
                  >
                    Subcategory: {course.subCategory}
                  </Typography>
                )}
              </div>
              <Typography
                variant="body2"
                color="textSecondary"
                gutterBottom
                style={{ fontSize: "16px" }}
              >
                Total Lessons: {course.totalLessons}
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

        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(`/enrolled-courses`)}
          >
            Back to Enrollments
          </Button>
        </Grid>

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
                {course.lessons.map((lesson) => (
                  <TableRow
                    key={lesson.lessonId} // Ensure each lesson has a unique key
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
