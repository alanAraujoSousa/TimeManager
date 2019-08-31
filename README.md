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

**daily**
curl -X POST "http://localhost:3000/api/v1/attendance" -H "accept: */*" -H "Content-Type: application/json" -d "{\"intervals\":[{\"start\":\"10:00\",\"end\":\"12:00\"}]}"

# Delete a attendance rule

**curl**

curl -X DELETE "http://localhost:3000/api/v1/attendance/{**PASTE_ID_HERE**}" -H "accept: */*"

**url**

http://localhost:3000/api/v1/attendance

