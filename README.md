# Google Drive Clone with Next.js and Appwrite

Welcome to the Google Drive Clone project! This project aims to replicate the core functionalities of Google Drive, including uploading, deleting, starring, and searching files by name or file type, using Next.js for the frontend and Appwrite for the backend.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Upload Files:** Upload any file to your personal drive.
- **Delete Files:** Remove unwanted files.
- **Star Files:** Mark important files for quick access.
- **Search Files:** Find files by name or file type.

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

Make sure you have the following installed on your system:

- Node.js (v14 or higher)
- npm or yarn
- Appwrite server

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/google-drive-clone.git
    cd google-drive-clone
    ```

2. **Install dependencies:**

    Using npm:
    ```bash
    npm install
    ```

    Or using yarn:
    ```bash
    yarn install
    ```

3. **Set up Appwrite:**

    - Install and set up Appwrite by following the [Appwrite installation guide](https://appwrite.io/docs/installation).
    - Create a new project in the Appwrite console.
    - Set up a new bucket for file storage in the Appwrite console.
    - Configure the necessary security permissions for file read/write operations.
    - Note the Project ID, Endpoint, and API key.

4. **Configure environment variables:**

    Create a `.env.local` file in the root of your project and add the following:

    ```plaintext
    NEXT_PUBLIC_APPWRITE_PROJECT_ID=your-appwrite-project-id
    NEXT_PUBLIC_APPWRITE_ENDPOINT=your-appwrite-endpoint
    NEXT_PUBLIC_APPWRITE_API_KEY=your-appwrite-api-key
    ```

### Usage

1. **Start the development server:**

    Using npm:
    ```bash
    npm run dev
    ```

    Or using yarn:
    ```bash
    yarn dev
    ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Folder Structure

Here's a brief overview of the project's folder structure:

google-drive-clone/
├── public/ # Static assets
├── src/
│ ├── components/ # React components
│ ├── app/ # Next.js pages
│ ├── actions/ # CSS and styling
│ └── utils/ # Utility functions
├── .env.example # Environment variables
├── .gitignore # Git ignore rules
├── next.config.js # Next.js configuration
├── package.json # Project metadata and dependencies
└── README.md # Project README


## Contributing

We welcome contributions! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

Thank you for using and contributing to the Google Drive Clone project!
