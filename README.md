## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```


### Compile for production
```
npm run build
npm run start
```

### The endpoints are in the postman collection in this project

# To Build the image on docker run the code from the root directory
docker build -t retraced .

# To run the container from the built image, run the code from the root directory
docker-compose up

# To access the endpoint, send a get request to
http://localhost:3000/api/categories

# You can pass a query string(id) to the URL 
http://localhost:3000/api/categories?id=3