import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const CourseCard = () => {
  // Hardcoded course details
  const course = {
    title: 'Sample Course Title',
    lessons: 10,
    thumbnail: 'https://via.placeholder.com/150', // Placeholder image URL
    lectureName: 'Sample Lecture Name',
  };

  return (
    <Card>
      <CardHeader
        title={course.title}
        subheader={`Lessons: ${course.lessons}`}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Lecture Name: {course.lectureName}
        </Typography>
        <img src={course.thumbnail} alt="Course Thumbnail" />
      </CardContent>
      <CardActions>
        <Button size="small">Enroll Now</Button>
      </CardActions>
    </Card>
  );
};

export default CourseCard;
