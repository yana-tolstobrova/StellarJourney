npm install json-server --save-dev 

data.json /create a file in root of document

npm install concurrently --save-dev /for run at the same time react-app and json-server in localhost

// package.json
"scripts": {
  "start": "concurrently \"json-server --watch data.json --port 3001\" \"react-scripts start\""
}

npm start

clear localhost port:
lsof -i :<port_number>
kill <pid>
