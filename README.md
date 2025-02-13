IOPS-API

# Description
IOPS (Immunization Official Posting System) is a web base online system for managing posting of immunization officials (staff) and supervisors within or outside the state.

# Technology Use
- This project is build on nodejs (expressjs)

# Libraries
Libraries used can be found in package.json file within the project file, and it build on;
- node 18.x
- npm 9.x.x

# Setup and Running of The App Locally
- in your VsCode terminal run
 $ git clone 
- open the clone repository folder created on your machine in Vscode
- Then run the following command in Vscode terminal, or git bash
>> npm install
- to start the server
>> npm run dev
- to start the server in watch mode
>> npm run start

# Choice on Storage
 The use of mongodb in other to handle quick reliable data access, and to aid performance.
 
# Tech Stack
- Server: Nodejs (Express), and Mongodb.

# Project Structure
    src
       |_ auth
       |_ config
       |_ location
                  |_ controllers
                  |_ model
                  |_ services
       |_ middleware
       |_ patients
                  |_utils
       |_route
       |_users
              |_ userControllers
              |_ userModel
              |_ userServices
              |_ util
            
# Future Features to be added:
- report generating
- post automation