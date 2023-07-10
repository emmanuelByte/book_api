www(server)>database>app.js>route>(middleware)>controller>model

Book API

1. User Register on the app.
2. User Login
3. User Reset Password
4. User Verify Account
5. List all Books
6. User Get a single Book
7. User Saved Book
8. User Remove Book from save
9. Get User Profile
10. Update User Profile
11. Delete User Profile
12. Update(change) Password

USER {
name,
email,
password,
country,
}

Book{
name,
author,
description,
}

1 Book to many User
1 User to many Book
