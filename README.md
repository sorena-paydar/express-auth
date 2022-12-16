# Express JsonWebToken Auth

## Description
Simple User Authentication with Express.

## Installation
```bash
$ npm install
```

## Creating an SSH Key Pair for User Authentication
```bash
# generate public/private RSA key pair
$ ssh-keygen -t rsa -b 4096 -m PEM -f rsa-private.key

# create an RSA Public Key based on generated Private Key using OpenSSL
$ openssl rsa -in rsa-private.key -pubout -outform PEM -out rsa-private.key.pub
```
> Use the same **passphrase** you set while generating RSA key pair.

## Environment variables
```bash
# create .env file according to .env.example
$ cp .env.example .env
```
> Set `PASSPHRASE` to **passphrase** you used for `rsa-private.key`.

## Database
```bash
# create and run database
$ npm run db:dev:up
```

## Running the app
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
## Testing the API
```bash
# register
$ curl -X POST -H "Content-Type: application/json" \
    -d '{"email": "sorenapaydar81@gmail.com", "username": "sorena", "password": "asdasd1234", "bio": "software engineer"}' \
    127.0.0.1:8000/auth/register
    
{
  success: true,
  message: "User signed up successfully!",
  data: {
    user: {
      id: 1,
      email: "sorenapaydar81@gmail.com",
      username: "sorena",
      bio: "software engineer",
      createdAt: "2022-12-16T15:56:26.651Z",
    },
    jwt: {
        token: <jwt_token>,
        expiresIn: <token_expiration>,
    },
  },
}

# login 
$ curl -X POST -H "Content-Type: application/json" \
    -d '{"email": "sorenapaydar81@gmail.com", "username": "sorena", "password": "asdasd1234"}' \
    127.0.0.1:8000/auth/login
   
{
    success: true,
    message: "User logged in successfully!",
    data: {
      user: {
        id: 1,
        email: "sorenapayasdasddar81@gmail.com",
        username: "soasdasdrena",
        bio: "software engineer",
        createdAt: "2022-12-16T16:13:19.283Z",
      },
      jwt: {
        token: <jwt_token>,
        expiresIn: <token_expiration>,
      },
    },
  }

```
