# API Integration Guide

## Authentication API Integration

This application has been integrated with both registration and login API endpoints:

### Registration API

- **URL**: `https://localhost:7058/api/User/register`
- **Method**: POST
- **Content-Type**: application/json

#### Request Body

```json
{
  "name": "string",
  "email": "user@example.com",
  "password": "string"
}
```

### Login API

- **URL**: `https://localhost:7058/api/User/login`
- **Method**: POST
- **Content-Type**: application/json

#### Request Body

```json
{
  "email": "user@example.com",
  "password": "string"
}
```

#### Response (Success)

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "6a9febab-d4a2-4650-ab74-b89485ab05fb",
  "expiration": "2025-10-23T16:44:37.3779734Z",
  "user": {
    "id": 4,
    "name": "string",
    "email": "user@example.com",
    "role": "string",
    "createdAt": "2025-10-23T14:42:11.444909Z",
    "updatedAt": "2025-10-23T14:42:11.44491Z"
  }
}
```

#### Response (Error)

```json
{
  "message": "Invalid email or password."
}
```

### Features Implemented

1. **Real API Integration**: Both registration and login call actual APIs
2. **JWT Token Management**: Proper handling of JWT tokens with expiration
3. **Error Handling**: Comprehensive error handling for various API responses
4. **Form Validation**: Client-side validation before API calls
5. **Loading States**: Loading indicators during API calls
6. **Success Messages**: Success feedback after operations
7. **Token Storage**: Secure storage of JWT token, refresh token, and user data
8. **Auto Token Expiration**: Automatic logout when token expires
9. **Registration Only**: Registration creates account without auto-login (user must sign in separately)

### Files Modified

- `src/utils/api.ts`: Updated base URL and added comprehensive error handling
- `src/services/authService.ts`: Updated register endpoint to match API spec
- `src/context/AuthContext.tsx`: Replaced mock registration with real API call
- `src/components/auth/SignUpForm.tsx`: Enhanced form handling and user feedback
- `.env`: Added API configuration

### Environment Setup

Create a `.env` file in the root directory:

```
### Environment Setup

Create a `.env` file in the root directory:
```

VITE_API_URL=https://localhost:7058/api

```

**Note**: Vite uses `import.meta.env` instead of `process.env`, so environment variables must be prefixed with `VITE_` instead of `REACT_APP_`.
```

### Development Notes

#### SSL Certificate Issues

Since the API uses HTTPS with localhost, you may encounter SSL certificate warnings. To resolve this:

1. Open `https://localhost:7058/api/User/register` directly in your browser
2. Accept the security warning and proceed to the site
3. This will add the certificate to your browser's trusted list

#### CORS Configuration

Make sure your API server has CORS configured to allow requests from your React app origin.

#### Testing the Integration

1. Start your API server on `https://localhost:7058`
2. Start the React development server
3. Navigate to the Sign Up page
4. Fill out the registration form and submit

### Error Handling

The application handles various error scenarios:

- **Network errors**: Connection refused, SSL certificate issues
- **Validation errors**: Client-side and server-side validation
- **Duplicate email**: Conflict when email already exists
- **Server errors**: 5xx status codes
- **Authentication errors**: 401 unauthorized responses

### API Response Expectations

The app expects the API to return:

- **Success (200/201)**: Registration successful (no data processing required)
- **Validation Error (400)**: Error object with validation details
- **Conflict (409)**: When email already exists
- **Server Error (500)**: Internal server error

### Registration Workflow

#### Registration Workflow

1. User fills out registration form
2. API call is made to create account
3. On success: User sees success message with link to sign in page
4. User must manually navigate to sign in page to log in
5. No automatic login or token storage occurs during registration

#### Login Workflow

1. User enters email and password
2. API call is made to authenticate user
3. On success: JWT token, refresh token, and user data are stored
4. User is automatically redirected to dashboard
5. Token expiration is monitored for automatic logout

### Testing API Directly

You can test the API using the test function in `src/utils/testAPI.ts`:

```javascript
import { testRegisterAPI } from "./src/utils/testAPI.ts";
testRegisterAPI();
```
