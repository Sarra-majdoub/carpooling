# Rideshare Web Application README

Welcome to our "FTHNITHY" Rideshare Web Application! This application allows users to create and join rides, report other users via the admin email, and provides various features for managing rides efficiently. Below, you'll find instructions on setting up and using the application.

## Features

- **Create Ride:** Users can create rides by providing details such as start location, destination, date, and time.
- **Join Ride:** Users can browse available rides and join those that match their preferences.
- **Report User:** Users can report other users via the admin email if they encounter any issues or violations.
- **Filter Rides:** Users can filter rides based on various criteria such as date, time, and location.
- **Admin Dashboard:** Admins have access to a dashboard where they can manage users and monitor application activity.

## Technologies Used

- **Frontend:** React.js
- **Backend:** Symfony (PHP)
- **Database:** MySQL

## Installation

To run the project, follow these steps:

1. Install XAMPP from [here](https://www.apachefriends.org/index.html).
2. Clone the project into `C:\xampp\htdocs`.
3. Start the Apache and MySQL services in XAMPP.
4. Navigate to the project's Client folder in your terminal.
5. Run the following command to install dependencies:

    ```bash
    npm install
    ```

6. Start the frontend development server:

    ```bash
    npm start
    ```

7. Navigate to the project's Backend folder in your terminal.
8. Run the following commands to set up the Symfony application and load data fixtures:

    ```bash
    composer install
    php bin/console doctrine:database:create
    php bin/console doctrine:migrations:migrate
    php bin/console doctrine:fixtures:load
    ```

9. Add this code to Apache Config (Apache (httpd.conf)):
   -Header always set Access-Control-Allow-Origin "*"
    Header always set Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS"
    Header always set Access-Control-Allow-Headers "origin, content-type, accept, authorization"
    Header always set Access-Control-Allow-Credentials "true"

10. Run:
  -composer require nelmio/cors-bundle

## Usage

- Access the application through your browser at http://localhost:3000.
- Sign up or log in to start using the application.
- Create a ride by providing the required details.
- Browse available rides and join those that match your preferences.
- Report other users via the admin email if necessary.
- Admins can access the admin dashboard to manage reported users and monitor application activity.

**Admin credentials:**
- Email: aymen.sallaouti@insat.ucar.tn
- Password: 123456789

## Contributors

- Abderrahmen Bejaoui
- Adem Saidi
- Rami Gharbi
- Majdoub Sarra
- Ala Eddine Zaouali
