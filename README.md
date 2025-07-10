# FURNI - ECOMMERCE API

## Technology used

- Node.js
- Express.js
- JWT
- MongoDB + Mongoose

## Setting

```bash
git clone https://github.com/theanhtran18/furni_e-commerce-api.git
cd furni_e-commerce-api
npm install

```

### Create .env file based on .env.example

```bash
cp .env.example .env
```

```bash
# Server
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017
DB_NAME=furni

# JWT Secrets
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret

# Google OAuth
GG_CLIENT_ID=your_google_client_id
GG_CLIENT_SECRET=your_google_client_secret

# Cookie Secret
COOKIE_SECRET=your_cookie_secret

# Redis
REDIS_URL=redis://localhost:6379

# Frontend & Google Callback
URL_FRONTEND=http://localhost:3000
URL_GG_CALLBACK=http://localhost:5000/api/auth/google/callback

# Email
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

### Run project

```bash
npm run dev
```

## License

**MIT License.**

## Author

**Trần Thế Anh**
