# Getting Started

This section will walk you through the process of setting up this project on your local machine.

## Prerequisites

Please make sure that you have Node.js installed on your machine.

## Clone the Repository

```sh
git clone https://github.com/StoyanKyopchev/Star-Wars.git
cd Star-Wars
```

## Backend Configuration

1. Navigate to the `backend` folder and create a file called `.env`. Once done, add the following content in it:

```plaintext
MONGODB_CONNECTION_STRING=
```

2. MongoDB setup

- Sign up for a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register).
- Once done, head to the "Projects" section, click on the "New Project" button at the top right corner of your screen and follow the instructions.
- Once you have created your project, head to the "Database" section (found on the left) and click the "Build a Database" button. Select the M0 FREE option and the region that is the closest to your location.
- Next, copy/write down the username and password that are provided to you after building the database and click the "Create User" button.
- Next, click on the "Database" section in the menu on the left side of your screen and you should see the database that you created. Click on the "Connect" button that is next to the name of your database and select the "Drivers" option.
- Copy the provided connection string and add it to the `MONGODB_CONNECTION_STRING` variable in the `.env` file that you created earlier. Do not forget to replace `<password>` with the password that you copied/wrote down earlier.

## Frontend Configuration

1. Navigate to the `frontend` folder and create a file called `.env`. Once done, add the following content in it:

```plaintext
VITE_SERVER_BASE_URL=
```

The url above should point to the URL where your backend application is running (the project is set up to run on port 5000 - `http://localhost:5000`).

## Running the Project

1. **Backend**:

- Navigate to the `backend` directory.
- Install the dependencies: `npm install`.
- Start the server with: `npm run dev`.

2. **Frontend**:

- Open a new terminal and navigate to the `frontend` directory
- Install the dependencies: `npm install`.
- Start the frontend application: `npm run dev`.
- The application should be running on `http://localhost:5173`, but you can also verify this in your terminal.
