# MEAN Full Project (backend + minimal Angular frontend)

Included:
- backend/ : Express + Mongoose + Sequelize (MySQL) + Jest tests
- frontend/ : Minimal Angular src/app files and package.json (you may need to create full Angular CLI project)

See backend/.env for environment variables.

To run backend:
1. cd backend
2. npm install
3. fill values in .env (MongoDB, MySQL, JWT secret)
4. npm run dev

To run frontend:
Option A (recommended): Create an Angular project with `ng new frontend` and copy `src/app` files from this package into it.
Option B: Try `npm install` then `ng serve` (requires global @angular/cli).

