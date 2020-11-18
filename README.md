# 18112020
 
# Pre-Requisite
  A. Install docker(https://docs.docker.com/get-docker/)
  
  B. Install docker-comopose (https://docs.docker.com/compose/install/)
  
  C. Postman (https://www.postman.com/) or any other API client 
  
# Instruction  
  1. Clone the project and ensure that port 8085 is open on your machine
  
  2. Go to the project folder and run this command "docker-compose up -d" and the system should start to build
  
  3. After building you can see 2 services are up and running using the command "docker ps" (1 or nodejs and 1 for mongoDB)
  
  4. Import the API from the file 18112020.postman.collection.json into postman
  
  5. Ther are 2 APIs in the collection
  
  
  # GET generateToken
  
    - return a JWT token that will expires in 120mins.
  
  
  # GET weather?q={country_name} 
  
  Header
  
    Authorization   required        Token from generateToken API.
  
  Parameters
  
    q               optional        Country name, use ISO country names. (as per OpenWeather)
  
