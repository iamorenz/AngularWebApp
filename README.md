# Package Delivery Management Application

My school assignment for the course "Full Stack Development" at Monash University.

This is a comprehensive package delivery management system built using the MEAN stack. It provides efficient tools for managing drivers and packages, along with real-time communication and enhanced user functionality.

---

## Features

- **Driver and Package Management**: Full CRUD operations for drivers and packages via RESTful API.
- **User Authentication**: Secure user authentication and authorization implemented with [Passport.js](http://www.passportjs.org/).
- **Multilingual Support**: Seamless integration with the Google Translate API for multi-language translations.
- **Distance Calculation**: Distance computation powered by the OpenAI API for delivery planning.
- **Real-Time Communication**: Real-time updates and interactions supported by [Socket.io](https://socket.io/).

---

## Technology Stack

- **Frontend**: [Angular](https://angular.io/)
- **Backend**: [Express.js](https://expressjs.com/) and [Node.js](https://nodejs.org/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **Authentication**: [Passport.js](http://www.passportjs.org/)
- **Real-Time Communication**: [Socket.io](https://socket.io/)
- **Third-Party APIs**:
  - [Google Translate API](https://github.com/AidanWelch/google-translate-api)
  - [OpenAI API](https://openai.com/)

---

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running Sever

Run `node.js` in the backend folder after the `ng build` command to do the frontend rendering. Navigate to `http://localhost:8080/`. The application will automatically reload if you change any of the source files.
