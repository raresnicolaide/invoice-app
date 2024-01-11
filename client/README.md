# Invoice App

A frontend application built with React, Vite and TypeScript. It leverages Redux Toolkit for component state manangement and Redux Toolkit Query for server state. For styling, tailwind css was used. The folder structure groups components, redux logic, utilities and screens - the available pages. While authenticated the user has access to the invoice page. Without being authenticated, a user only sees the login page.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Installation

2. **Navigate to client project:**

   ```bash
   cd client
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

   **Note:**
   In case there is any installation error try using `--legacy-peer-deps` flag

4. **Start the project:**

   ```bash
   npm run start
   ```

## Usage

**Login Credentials:**

In order to access the application, users must login with the following credentials:

- **Email:** johndoe@mail.com
- **Password:** password-john

OR

- **Email:** janedoe@mail.com
- **Password:** password-jane
