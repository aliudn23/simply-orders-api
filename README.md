# Simply Order API technical test for Istana Group

# Main Feature 
1. Authentication ( JWT Token and Database Session ) 
2. ORM 
3. Prisma ( Migration and Seeder )
4. Get Order 
5. Create Order
6. Docker Compose

# Public Endpoint
1. [POST] {url}/login ( Login to get token to access private endpoint using bearer token )

# Private Endpoint (Accessible when logged in )
2. [GET] {url}/me/:id
3. [POST] {url}/logout
4. [GET] {url}/products ( Getting all products )
5. [GET] {url}/products/:id ( Getting product by ID )
6. [GET] {url}/orders ( Getting orders history )
7. [GET] {url}/orders/:id ( Getting orders details )
8. [POST] {url}/orders ( Create an orders )

# Environment
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=3600

DB_HOST=localhost
DB_PORT=5432
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_db_name
DATABASE_URL="your database url"
