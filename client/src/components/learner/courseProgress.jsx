// CoursesList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CoursesList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/api/courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="courses-list">
      {courses.map(course => (
        <div className="card" key={course._id}>
          <img src={course.thumbnail} alt={course.title} />
          <div className="card-body">
            <h5 className="card-title">{course.title}</h5>
            <p className="card-text">{course.description}</p>
            <p className="card-author">Author: {course.author}</p>
            {/* Add more details as needed */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CoursesList;
