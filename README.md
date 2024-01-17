Visit the website at: [https://ams2-o0p0.onrender.com](https://ams2-o0p0.onrender.com)

## Step-by-step instructions to set up your own configuration using environment variables.

### Step 1: Create a Sample Environment Variables File
- Copy the `.env.sample` file and create a new file named `.env` in the root of your project.
    ```bash
    cp .env.sample .env
    ```

### Step 2: Install Dependencies
- Make sure you have already installed the dependencies (for both frontend and backend) by running:
    ```bash
    npm install
    ```

### Step 3: Run the Application
- **Running in Development:**
    This command uses nodemon to watch for changes in your files and automatically restarts the server.
    ```bash
    npm run dev
    ```

- **Running in Production:**
    This command starts your application in a production environment using the node command.
    ```bash
    npm start
    ```

**Note🔔:** Before running it in the deployment server, create the build file for the frontend code of your project. I have hosted both frontend and backend on a single service at Render. You can change it as you like.

