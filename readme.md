# Node.js Express API for Sending Emails

This is a simple Node.js Express API for sending emails. It provides an endpoint `/sendEmail` for sending emails using the Nodemailer library. You can also check the status of the API by making a GET request to `/`.

## Installation

1. Clone this repository:
    ```shell
    git clone <repository-url>
2. Install the required dependencies:
    ```shell
   npm install
2. run app
    ```shell
    npm start

The API will be accessible at http://localhost:3001/api.


Configuration
The configuration for the API is stored in the config directory, and you can customize it by editing the configuration files:

- config/default.json: Contains the general configuration, such as the API port and allowed IP addresses email account.


Get API Info
- URL: /api
- Method: GET
- Description: Retrieve information about the API, including its name and version.

Send Email

- URL: /api/sendEmail
- Method: POST
- Description: Send an email to the specified recipient.
- Request Body:
```json
 {
    "to": "recipient@example.com",
    "subject": "Email Subject",
    "content": "Email Content"
 }
