# BankMate

BankMate is a full-stack application that combines a Python-based backend with a Next.js frontend to deliver a seamless experience for analyzing your personal banking data.

## Project Structure

- **backend/**: Contains the Python function app and its configuration files.
  - `function_app.py`: The core application logic for backend processing.
  - `host.json` & `local.settings.json`: Configuration files for the function app.
  - **data/**: Contains raw data files like `banking_data.csv` used by the backend.

- **frontend/**: Contains the Next.js frontend application.
  - Contains configuration files such as `next.config.ts`, `package.json`, `tsconfig.json`, etc.
  - **app/**: Main app source code including pages, layouts, and assets.
  - **public/**: Static files such as images and icons.
  - **.next/**: Build output folder for the Next.js project.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [Python](https://www.python.org/) (v3.8 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Running the Backend

1. Navigate to the `backend` folder:
   ```sh
   cd backend
   ```
2. Create and activate a virtual environment (optional but recommended):
   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows use 'venv\Scripts\activate'
   ```
3. Install required packages:
   ```sh
   pip install -r requirements.txt
   ```
4. Run the application:
   ```sh
   python function_app.py
   ```

### Running the Frontend

1. Navigate to the `frontend` folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
4. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

## Deployment

### Backend

Deploy the Python function app to your preferred cloud provider (e.g., Azure Functions). Ensure the configurations in `host.json` and `local.settings.json` are updated to reflect your production environment.

### Frontend

Build the Next.js app for production:
```sh
npm run build
npm run start
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any bugs or improvements.

## License

This project is licensed under the MIT License.