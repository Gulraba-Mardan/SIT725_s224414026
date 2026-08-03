# SIT725 4.2P - Movie Explorer

## Project Overview

Movie Explorer is a Node.js web application developed for SIT725 Task 4.2P.

The application uses Express, MongoDB and Mongoose to store and retrieve movie information from a database. The frontend sends requests to the server, and movie data is displayed dynamically on the webpage.

This project is an original variation of the Week 4 practical. It uses different database fields and different sample data.

---

## Features

- Display movies stored in MongoDB
- Retrieve movie data through a REST API
- Add new movies through the webpage
- Store newly added movies permanently in MongoDB
- Responsive interface using Materialize CSS

---

## Movie Data Fields

Each movie contains:

- Movie title
- Genre
- Director
- Release year
- Rating

---

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- HTML
- CSS
- JavaScript
- Materialize CSS

---

## Installation

Clone the repository and open the project folder.

Install the required packages:

```bash
npm install
```

Make sure MongoDB is running locally.

Start MongoDB:

```bash
brew services start mongodb-community
```

Seed the sample movie data:

```bash
node seed.js
```

Start the application:

```bash
npm run dev
```

Open the application in your browser:

```
http://localhost:3000
```

---

## API Endpoints

Get all movies:

```
GET /api/movies
```

Add a new movie:

```
POST /api/movies
```

---

## Database

Database Name:

```
movieExplorerDB
```

Collection Name:

```
movies
```

---

## Author

SIT725 4.2P Assignment

Movie Explorer

Developed using:

- Express.js
- MongoDB
- Mongoose
- Materialize CSS