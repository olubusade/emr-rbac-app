
---

# Role-Based Access Control (RBAC) EMR System

This project implements a Role-Based Access Control (RBAC) system for an Electronic Medical Records (EMR) system. The application uses Angular for the frontend, Node.js for the backend, and MySQL for the database. It is designed to manage multiple user roles such as Admin, Doctor, Nurse, and Front Desk with different permissions (read, write, update) on various resources within the system.

## Features

- **Login System**: Users log in with their credentials and are authenticated via a backend API.
- **Role-Based Dashboard**: Once authenticated, users are redirected to their role-specific dashboards (Admin, Doctor, Nurse, Front Desk).
- **Role Permissions**: Users can perform different actions (read, write, update) depending on their assigned role.
- **Backend Integration**: User roles and permissions are fetched dynamically from the backend.
- **Responsive UI**: The system is built with Bootstrap for a responsive and user-friendly interface.

## Prerequisites

Before running the application, make sure you have the following installed:

- **Node.js** and **npm** (for backend and frontend)
- **MySQL** (for the database)
- **Angular CLI** (for frontend development)

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/olubusade/emr-rbac-app.git
cd emr-rbac-app
```

### 2. Set up the backend (Node.js)

#### a. Install Backend Dependencies

Go to the `backend` directory and install the necessary dependencies:

```bash
cd server
npm install
```

#### b. Configure MySQL Database

Create a MySQL database and set up tables for users and roles.

```sql
CREATE DATABASE emr_rbac;

USE emr_rbac;

CREATE TABLE roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE permissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  resource VARCHAR(50) 
  readme BOOLEAN,
  writeme BOOLEAN,
  updateme BOOLEAN
);

CREATE TABLE role_permissions (
  role_id INT,
  permission_id INT,
  FOREIGN KEY (role_id) REFERENCES roles(id),
  FOREIGN KEY (permission_id) REFERENCES permissions(id)
);

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role_id INT,
  FOREIGN KEY (role_id) REFERENCES roles(id)
);

```

Update the `server/config.js` file with your database credentials.

#### c. Run the Backend Server

```bash
node server.js
```

The backend API will now be running on `http://localhost:3000`.

### 3. Set up the frontend (Angular)

#### a. Install Frontend Dependencies

Go to the `frontend` directory and install the necessary dependencies:

```bash
cd frontend
npm install
```

#### b. Configure the API URL

<<<<<<< HEAD
In the `frontend/src/app/services/auth.service.ts` file, update the API URL to point to your backend:

```typescript
private apiUrl = 'http://localhost:3000/login'; // Adjust the URL if needed
```

#### c. Run the Frontend Application

```bash
ng serve
```

The frontend will now be running on `http://localhost:4200`.

## Project Structure

- **`frontend/`**: Angular-based frontend that handles the UI, routing, and form handling.
  - **`src/app/`**: Contains all components, services, models, and routing.
  - **`login.component.ts`**: Handles user login functionality.
  - **`dashboard.component.ts`**: Displays the dashboard based on user role.
  - **`auth.service.ts`**: Manages authentication and user session.
  
- **`server/`**: Node.js-based backend that serves the API for authentication and role management.
  - **`server.js`**: Main entry point of the backend server.
  - **`config.js`**: Contains database configuration.
  - **`authController.js`**: Handles login and authentication logic.
  - **`roleController.js`**: Manages role and permission assignments.

## How to Use

1. **Login**: Navigate to `http://localhost:4200` and enter the credentials (use the default username and password if necessary).
2. **Role-Based Dashboards**: Depending on the user role (admin, doctor, nurse, or front desk), users are redirected to their respective dashboards.
3. **Permissions**: Each user has specific permissions (read, write, update) based on their role, which dictates what actions they can perform within the app.

## Role-Based Dashboard Details

### Admin Dashboard:
- Full access to all features: read, write, and update for all resources.

### Doctor Dashboard:
- Can read patient records, but can only update their own patient data.

### Nurse Dashboard:
- Can read patient records, and update basic details (e.g., nursing notes).

### Front Desk Dashboard:
- Can read patient records and add new patient data but has limited access to sensitive information.

## Notes

- The login system uses a basic JWT authentication model. Once a user logs in, a JWT token is returned, which should be stored in localStorage for further authenticated API requests.
- Roles and permissions are retrieved from the backend dynamically. Make sure the permissions are set up properly for each role.

## Future Enhancements

- Implement JWT token expiration and refresh logic.
- Add more granular permissions (e.g., view only specific records).
- Integrate more advanced role management (e.g., custom roles).
- Improve security (e.g., password hashing, secure token storage).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
=======
4. Start the frontend:
   ng serve
5. The frontend should be running on http://localhost:4200



Here’s a complete documentation for your project that you can use on GitHub:

EMR System with Role-Based Access Control (RBAC)
Overview
This project implements a Role-Based Access Control (RBAC) system for an Electronic Medical Record (EMR) system using Node.js, Angular, MySQL, and Bootstrap. The system supports different user roles, including admin, doctor, nurse, front desk, biller, and pharmacist, with distinct access permissions for each role.

Features
Role-based access control: Users are assigned specific roles (admin, doctor, nurse, etc.), and each role has predefined permissions.
Granular Permissions: Permissions are split into viewme, readme, writeme, and updateme to control what actions users can perform on each resource.
Dynamic role management: Admins can assign and remove permissions dynamically.
Database-backed permissions: Permissions are stored in a database, allowing flexibility in role management without code changes.
Tech Stack
Frontend: Angular, Bootstrap
Backend: Node.js, Express.js
Database: MySQL
Authentication: JWT (JSON Web Token)
Project Structure
Backend
plaintext
Copy code
- /server
  - /models
    - user.js          # User model schema
    - role.js          # Role model schema
    - permission.js    # Permission model schema
    - role_permission.js # Role-Permission mapping
  - /controllers
    - userController.js # Controller for user operations
    - authController.js # Controller for authentication
  - /middleware
    - authMiddleware.js # Middleware for JWT authentication
    - permissionMiddleware.js # Middleware for permission authorization
  - /routes
    - userRoutes.js      # Routes for user operations
    - authRoutes.js      # Routes for authentication
  - /config
    - db.js              # Database connection configuration
  - server.js            # Express server setup
Frontend
plaintext
Copy code
- /src
  - /app
    - /services
      - auth.service.ts   # Service to handle authentication and permission checks
    - /components
      - navbar.component.ts # Navigation bar component
    - /pages
      - dashboard.component.ts # User dashboard page
      - login.component.ts # Login page
    - /models
      - user.model.ts      # User model
  - app.module.ts          # Angular module
  - main.ts                # Entry point for Angular application
Database Schema
users Table
sql
Copy code
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES roles(id)
);
roles Table
sql
Copy code
CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);
permissions Table
sql
Copy code
CREATE TABLE permissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    resource VARCHAR(100) NOT NULL UNIQUE,
    viewme BOOLEAN DEFAULT FALSE,
    readme BOOLEAN DEFAULT FALSE,
    writeme BOOLEAN DEFAULT FALSE,
    updateme BOOLEAN DEFAULT FALSE
);
role_permissions Table
sql
Copy code
CREATE TABLE role_permissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_id INT NOT NULL,
    permission_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (permission_id) REFERENCES permissions(id)
);
Setup Instructions
Backend (Node.js)
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/emr-rbac.git
cd emr-rbac
Install dependencies:

bash
Copy code
npm install
Configure the database connection in /server/config/db.js:

js
Copy code
const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'emr_rbac'
});

db.connect(err => {
  if (err) throw err;
  console.log('Database connected...');
});

module.exports = db;
Start the server:

bash
Copy code
npm start
The backend should be running on http://localhost:3000.

Frontend (Angular)
Install Angular CLI globally if not already installed:

bash
Copy code
npm install -g @angular/cli
Clone the repository and install dependencies:

bash
Copy code
git clone https://github.com/your-username/emr-rbac-frontend.git
cd emr-rbac-frontend
npm install
Update the auth.service.ts to interact with your backend API (make sure the backend is running before testing):

typescript
Copy code
private apiUrl = 'http://localhost:3000'; // backend URL
Start the frontend:

bash
Copy code
ng serve
The frontend should be running on http://localhost:4200.

**Usage**
**Authentication**
User Login: Users can log in via the /login route, which requires a valid username and password. Upon successful login, a JWT token will be returned.
Protected Routes: Routes such as /patient-records, /prescriptions, /appointments require valid JWT tokens. The token must be sent in the Authorization header for these routes.
Permissions: Permissions are checked at both the backend and frontend levels:
Backend: The authorizePermission middleware ensures that the user has the necessary permissions before accessing the resource.
Frontend: The AuthService helps check if the user has permission to view, update, read, or write data in the frontend.
Example Routes
Patient Records (Admin has full access):

GET /patient-records: View patient records
POST /patient-records: Write patient records
Prescriptions (Doctors have read/write access):

GET /prescriptions: Read prescriptions
POST /prescriptions: Write prescriptions
Appointments (Nurses and Front Desk have limited access):

GET /appointments: View and read appointments
PUT /appointments: Update appointments

**Contribution Guidelines**
1. Fork this repository.
Create a new branch (git checkout -b feature-name).

2. Make your changes.
Commit your changes (git commit -am 'Add new feature').

3. Push to the branch (git push origin feature-name).

4. Open a pull request.

**License**
This project is licensed under the MIT License - see the LICENSE file for details.

**Contact**
If you have any questions or feedback, feel free to reach out via olubusde@gmail.com.
>>>>>>> 657518f2d2ba5ba2c439c5c2292da184f67b89ab
