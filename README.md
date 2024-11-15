#This is the frontend of the postCRUD built using **Vite**.

#Note: We cannot make permanant changes in JSONPlaceholder. Only Get the data from the server. and check the status for delete and update

#Prerequisites
  1. Node.js
  2. npm
  3. vite

#How to Setup and Run
  1. install vite if not installed (npm i vite)
  2. clone the directory
  3. change directory
  4. open in a code editor ( eg: VSCode)
  5. Install node modules and dependencies
       npm install axios react-bootstrap bootstrap react-router-dom react-toastify
  6. Run the project
       npm run dev

#Description about the Project Functionality and Features included.
  - Run the project using the command npm run dev.
  - Open it in any browser (Firefox, Chrome preferred)
  - When open, Landing page shows. Click on "Go to Dashboard" button. Then it navigate to dashboard page.
  - In dashboard component, when the component loading it fetch all the post from "JSONPlaceholder" and show all the post
  - On the top right side, a button for add post. When click on add post, a modal opens with input forms
  - It validate all fields were entered or not. If all field not entered, shows alert.
  - If all field contain data, it sent a request to backend and store it in db.json file.
  - At the same time, It will reflect on the dashboard. in the reverse order. (Last data shows First).
  - Edit and Delete buttons provided for all posts. So that we can edit and delete Individual posts.
    
  - For editing, Click on edit button, then opens a modal and show the current data in the modal. make necessary changes and click on save changes.
  - If the post is in db.json, it will update. Otherwise it is from JSONPlaceholder, make request to JSONPlaceholder and if the response is success, alert shows about Updated.

  - For deleting, click on the delete button. Then the post deleted and shows the remaining posts.
  - If the post if in db.json, it will delete permanantly. If it include in JSONPlaceholder, It delete and shows the remaining posts (without refreshing page manually)

  - We can sort it by Title and UserId (Ascending order)
  - Also we can Search any post by entering userId or Title

#Technologies Used
  1. Vite
  2. React
  3. Bootstrap

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
