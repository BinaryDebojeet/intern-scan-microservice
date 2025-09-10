
# INTERNSCAN API Documentation

## Authentication APIs

### 1. Login
**POST** `/auth`  
**URL:**  
```
https://5e74a0e9-d6e4-482e-89f1-648328225f7d.mock.pstmn.io/auth
```
**Body (JSON):**
```json
{
  "event": "login",
  "mode": "email-otp",
  "email": "user@example.com",
  "passcode": "10069a2b1238"
}
```

---

### 2. Send OTP
**POST** `/auth/send-otp`  
**URL:**  
```
https://5e74a0e9-d6e4-482e-89f1-648328225f7d.mock.pstmn.io/auth/send-otp
```
**Body (JSON):**
```json
{
  "mode": "mobile",
  "mobile": "9804557370",
  "country-code": "91"
}
```

---

### 3. Verify OTP
**POST** `/auth/verify-otp`  
**URL:**  
```
https://5e74a0e9-d6e4-482e-89f1-648328225f7d.mock.pstmn.io/auth/verify-otp
```
**Body (JSON):**
```json
{
  "mode": "email",
  "email": "user@example.com",
  "otp": "123456",
  "passcode": "10069a2b1238"
}
```

---

## User Management APIs

### 4. Get User Details
**GET** `/auth/user`  
**URL:**  
```
https://5e74a0e9-d6e4-482e-89f1-648328225f7d.mock.pstmn.io/auth/user?user-id=044eaae262eb
```
**Headers:**
```
Cookie: token=7e8c4da1-98da-422b-9d99-9b43a9e8401b
```
**Params:**
```
user-id = 044eaae262eb
```

---

### 5. Update User
**PUT** `/auth/user`  
**URL:**  
```
https://5e74a0e9-d6e4-482e-89f1-648328225f7d.mock.pstmn.io/auth/user?user-id=044eaae262eb
```
**Headers:**
```
Cookie: token=7e8c4da1-98da-422b-9d99-9b43a9e8401b
```
**Params:**
```
user-id = 044eaae262eb
```
**Body (JSON):**
```json
{
  "user-id": "044eaae262eb",
  "profile-photo": "https://res.cloudinary.com/drwuembvg/image/upload/v1757274765/profile.jpg",
  "lastName": "Jana updated",
  "dob": "25-09-1991"
}
```

---

### 6. Delete User
**DELETE** `/auth/user`  
**URL:**  
```
https://5e74a0e9-d6e4-482e-89f1-648328225f7d.mock.pstmn.io/auth/user?user-id=044eaae262eb
```
**Headers:**
```
Cookie: token=7e8c4da1-98da-422b-9d99-9b43a9e8401b
```
**Params:**
```
user-id = 044eaae262eb
```

---

### 7. Reset Password
**PUT** `/auth/password`  
**URL:**  
```
https://5e74a0e9-d6e4-482e-89f1-648328225f7d.mock.pstmn.io/auth/password
```
**Headers:**
```
Cookie: token=7e8c4da1-98da-422b-9d99-9b43a9e8401b
```
**Body (JSON):**
```json
{
  "event": "reset",
  "mode": "email",
  "mobile": "user@example.com",
  "otp": "123456",
  "new-password": "New@123456"
}
```
