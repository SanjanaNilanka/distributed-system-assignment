module.exports = {
    server: {
        port: process.env.PORT || 5000,
    },
    db: {
        dbUrl: process.env.DB_URL || "mongodb+srv://nilankasanjana803:learnverse@cluster0.9uiy8gz.mongodb.net/courses?retryWrites=true&w=majority&appName=Cluster0"
    },
    auth:{
        jwtSecret: process.env.JWT_SECRET || 'DSAssignmentLearnVerse'
    }
}