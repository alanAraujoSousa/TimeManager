# TimeManager

# Run

npm run dev

# Test

npm run test

# Swagger documentation

http://localhost:3000/api-docs

# List Attendance rules

**url**

http://localhost:3000/api/v1/attendance

**curl**

curl -X GET "http://localhost:3000/api/v1/attendance" -H "accept: */*"

# Create a attendance rule

**url**

http://localhost:3000/api/v1/attendance

**curl**

**daily:**  
curl -X POST "http://localhost:3000/api/v1/attendance" -H "accept: */*" -H "Content-Type: application/json" -d '{\"intervals\":[{\"start\":\"10:00\",\"end\":\"12:00\"}]}'

**weekly:**
curl -X POST "http://localhost:3000/api/v1/attendance" -H "accept: */*" -H "Content-Type: application/json" -d '{\"frequency\":{\"days\":[\"Monday\",\"Saturday\"]},\"intervals\":[{\"start\":\"13:00\",\"end\":\"15:00\"}]}'

**fixed date:**
curl -X POST "http://localhost:3000/api/v1/attendance" -H "accept: */*" -H "Content-Type: application/json" -d '{\"frequency\":{\"day\":\"31-08-2019\"},\"intervals\":[{\"start\":\"17:00\",\"end\":\"18:00\"}]}'

# Delete a attendance rule

**curl**

curl -X DELETE "http://localhost:3000/api/v1/attendance/{PASTE_ID_HERE}" -H "accept: */*"

**url**

http://localhost:3000/api/v1/attendance

# List Availabilities

**url**

http://localhost:3000/api/v1/availability?start=30-08-2019&end=31-08-2019

**curl**

curl -X GET "http://localhost:3000/api/v1/availability?start=30-08-2019&end=31-08-2019" -H "accept: */*"

