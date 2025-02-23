# How to Run the Project

Follow these steps to set up and run the project:

1. Create the database in MongoDB Atlas or Compass.
2. Store the connection string and JWT secret in a  backend/`.env` file if the file does not exist make it (it will look like this).
    ```sh
    DB_URI = "your connection string"
    JWT_SECRET= "your jwt secret(any random combination of numbers and strings)"

    ```
3. Navigate to the backend directory:
    ```sh
    cd backend
    ```
4. Install the backend dependencies:
    ```sh
    npm install
    ```
5. Navigate to the frontend directory:
    ```sh
    cd frontend
    ```
6. Install the frontend dependencies:
    ```sh
    npm install
    ```
7. To run the backend, navigate to the backend directory and start the server:
    ```sh
    cd backend
    npm start
    ```
    or
    ```sh
    cd backend
    npm watch
    ```
8. To run the frontend, navigate to the frontend directory and start the development server:
    ```sh
    cd frontend
    npm run dev
    ```