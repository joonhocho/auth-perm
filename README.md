# auth-perm
A simple level-based permission authorization

## WORK IN PROGRESS

### Install
```
npm install --save auth-perm
```


### Usage
```javascript
const perm = new Permissions({
  admins: ['adminId1', 'adminId2'], // Admin user ids
  defaultLevel: 0,                  // Default required user permission level
  authenticatedLevel = 1,           // Level assigned to authenticated users
  adminLevel = 10,                  // Level assigned to admin user
});

// Returns true if allowed.
perm.check(
  {
    p: 2,                   // User permission level required for this check
    a: ['allowedUserId1'],  // Whitelisted user ids
    b: ['blockedUserId1'],  // Blacklisted user ids
  },
  
  'sessionUserId',          // Optional user id.
                            // If provided, authenticated user level will be assigned.
                            // Also, it will be tested against whitelist and blacklist ids.
                            // If not provided, user permission level will be 0.
                            
  3                         // Optional user level.
                            // If provided, Math.max(custom, userLevel) will be used as the user's permission level.
);
```
