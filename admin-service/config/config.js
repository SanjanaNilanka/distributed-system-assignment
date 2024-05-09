module.exports = {
    server: {
        port: process.env.PORT || 6000,
    },
    db: {
        dbUrl: process.env.DB_URL || "mongodb+srv://nilankasanjana803:learnverse@cluster0.9uiy8gz.mongodb.net/admins?retryWrites=true&w=majority&appName=Cluster0"
    },
}