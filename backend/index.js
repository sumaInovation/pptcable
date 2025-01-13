const express = require('express');
const path = require('path');
const app = express();
const cookiesparser=require('cookie-parser');
const cors=require('cors');
const connectDB = require('./db/connectDB')
const authRoutes = require('./Routes/auth.route');
const PORT = process.env.PORT||5000;
// const __dirname = path.resolve();
//use middleware
app.use(express.json())//allows to allowing req.body
app.use(cookiesparser())//allows pasre cookies
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}))

app.use('/api/auth', authRoutes);
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/build")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname,  "build", "index.html"));
	});
}

app.listen(PORT, () => {
    connectDB();
    console.log(`Server Running on port:${PORT}`)
});   