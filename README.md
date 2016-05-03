# auth-perm
A simple level-based permission authorization


### Install
```
npm install --save auth-perm
```


### Usage
```javascript
const perm = new Permissions({
  admins: ['adminId1', 'adminId2'], // Admin ids
  defaultLevel: 0,                  // Default required permission level
  authenticatedLevel = 1,           // Authenticated user level
  adminLevel = 10,                  // Admin user level
});

// Returns true if allowed.
perm.check({
  p: 2,                   // Required permission level
  a: ['allowedUserId1'],         // Allowed user ids
  b: ['blockedUserId1'],  // Blocked user ids
}, 'sessionUserId');
```
