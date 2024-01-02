# POC Container

## Overview
POC Container is a React-based web application built using a modular approach with dynamic loading of components and routing configurations. It demonstrates a container-application architecture where child components (modules) are loaded and routed based on external configuration files.

### Main Concepts
- **Modular Architecture**: The application is designed to dynamically load child modules based on configuration, allowing for a flexible and scalable structure.
- **Dynamic Component Loading**: Components are loaded lazily using React's `Suspense` and `React.lazy`, enhancing performance by loading components only when they are needed.
- **External Configuration**: The application fetches its module and route configuration from external JSON files, enabling easy updates and management of the component structure and routing without redeploying the application.
- **Environment-Based Configuration**: Configurable URLs for fetching external configurations are set using environment variables, making the application adaptable to different environments (development, staging, production, etc.).

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/en/): A JavaScript runtime environment. Make sure you have it installed on your system.
- [npm](https://www.npmjs.com/): A package manager for JavaScript, installed with Node.js.

### Installation and Setup
1. **Clone the Repository**
git clone https://github.com/isaialbarran/poc-container
cd poc-container

2. **Install Dependencies**
npm install

3. **Set Up Environment Variables**
- Create a `.env` file in the project root.
- Add the following lines, replacing the URLs with the actual paths to your configuration files:
  ```
  CHILD_CONFIG_URL=http://localhost:8080/child-config.json
  ROUTE_CONFIG_URL=http://localhost:8080/route-config.json
  ```

4. **Run the Application**
npm start

This will start the development server. Your application should now be running on [http://localhost:3000](http://localhost:3000).
