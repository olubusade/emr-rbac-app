
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
