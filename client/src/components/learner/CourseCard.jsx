// CourseCard.js

import React from 'react';

const CourseCard = ({ course }) => {
    // Check if course is undefined
    if (!course) {
        return <div>No course data available</div>;
    }

    const { title, outline, learners } = course;

    // Calculate course progress (using dummy data)
    const totalLessons = outline.reduce((acc, section) => acc + section.lesson.length, 0);
    const completedLessons = outline.reduce((acc, section) => {
        const completed = section.lesson.filter(lesson => lesson.status).length;
        return acc + completed;
    }, 0);
    const progress = Math.round((completedLessons / totalLessons) * 100);

    return (
        <div className="course-card">
            <h3>{title}</h3>
            <p>Total Lessons: {totalLessons}</p>
            <p>Progress: {progress}%</p>
            {/* Render dummy learners */}
            {learners && learners.length > 0 && (
                <div>
                    <h4>Learners:</h4>
                    <ul>
                        {learners.map(learner => (
                            <li key={learner._id}>{learner.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CourseCard;
