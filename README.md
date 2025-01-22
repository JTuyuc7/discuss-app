### To run the project, you'll need to configure 3 environment variables

```javascript
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""
AUTH_SECRET=""
```

### Init the DB
This will crate a folder `prisma` where you can add your schema validations
```javascript
  npx prisma init --datasource-provider sqlite
```

### Generate your dev environment
This will generate your DB in development mode
```javascript
  npx prisma migrate dev
```

