const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const authRoutes = require("./routes/authRouters");
const driverRoutes = require("./routes/driverRouters");
const packageRoutes = require("./routes/packageRouters");
const statisticRoute = require("./routes/statisticsRouter");
const User = require("./models/user");
const { OpenAI } = require("openai");
const googleTranslate = require("google-translate-api-x");

const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
server.listen(8080);

const io = new Server(server);

app.use(express.json());
app.use(express.static("./dist/assignment-3/browser"));

// Set up session middleware
app.use(
  session({
    secret: "myKey",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Configure Passport to use the local strategy for authentication
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      // Find the user in the database based on the provided username
      const user = await User.findOne({ username });

      if (!user) {
        // If user not found, return error message
        return done(null, false, { message: "Incorrect username" });
      }

      // Compare the provided password with the hashed password in the database
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        // If passwords don't match, return error message
        return done(null, false, { message: "Incorrect password" });
      }

      // Authentication succeeded, pass the user object to the next middleware
      return done(null, user);
    } catch (err) {
      // If an error occurs, pass it to the next middleware
      return done(err);
    }
  })
);

// Serialize the user's ID to store in the session cookie
passport.serializeUser((user, done) => {
  // Store only the user's ID in the session, making it lightweight
  done(null, user.id);
});

// Deserialize the user's ID from the session cookie and fetch the user object
passport.deserializeUser(async (id, done) => {
  try {
    // Find the user by ID in the database
    const user = await User.findById(id);
    // Pass the user object to the next middleware
    done(null, user);
  } catch (err) {
    // If an error occurs, pass it to the next middleware
    done(err);
  }
});

const url = "mongodb://127.0.0.1:27017/FIT2095-A3";

/**
 * Connect to MongoDB database.
 *
 * @async
 * @function connectDB
 * @param {string} url - MongoDB connection string.
 * @returns {Promise<string>} Returns a success message if connected successfully.
 */
async function connectDB(url) {
  await mongoose.connect(url);
  return "Connected Successfully";
}

connectDB(url)
  .then(console.log)
  .catch((err) => console.log(err));

/**
 * Routes for the driver and package APIs.
 */
app.use("/32597517/Guangxing/api/v1/drivers", driverRoutes);
app.use("/32597517/Guangxing/api/v1/packages", packageRoutes);
app.use("/32597517/Guangxing/api/v1/auth", authRoutes);
app.use("/32597517/Guangxing/api/v1", statisticRoute);

// Protect My API Key
require("dotenv").config();
const open_ai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

io.on("connection", (socket) => {
  console.log("Hello From Backend");

  // Calculate Distance Event
  socket.on("calculateDistance", async (data) => {
    try {
      const { destination } = data;

      const distance = await calculateDistanceWithAI(destination, "Melbourne");

      socket.emit("distanceCalculated", { distance, destination });
    } catch (error) {
      socket.emit("distanceCalculated", {
        distance: "Error calculating distance",
      });
    }
  });

  // Translate Description Event
  socket.on("translateDescription", async (data) => {
    try {
      const { description, targetLanguage, packageId } = data;

      // Using google-translate-api library
      const response = await googleTranslate(description, {
        to: targetLanguage,
      });

      // Emit the translated description along with the packageId and targetLanguage
      socket.emit("descriptionTranslated", {
        description: response.text,
        targetLanguage,
        packageId,
      });
    } catch (error) {
      socket.emit("descriptionTranslated", {
        description: "Error translating description",
        targetLanguage: data.targetLanguage,
        packageId: data.packageId,
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Function to calculate distance using AI
async function calculateDistanceWithAI(destination, base) {
  try {
    const chatCompletion = await open_ai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Tell me the distance between ${base} and ${destination} in Kilometers.`,
        },
      ],
    });

    const responseMessage = chatCompletion.choices[0].message.content;
    return responseMessage;
  } catch (error) {
    console.error("Error from OpenAI API:", error);
  }
}
