export default class Permissions {
  constructor({
    admins,
    defaultLevel = 0,
    authenticatedLevel = 1,
    adminLevel = 10,
  } = {}) {
    const adminMap = (admins || []).reduce(
      (obj, id) => { obj[id] = true; return obj; }, {});

    this.check = ({p = defaultLevel, a, b}, userId, userLevel) => {
      const isAuthed = userId != null;

      if (adminMap[userId] === true) {
        userLevel = Math.max(adminLevel, userLevel || 0);
      } else if (isAuthed) {
        userLevel = Math.max(authenticatedLevel, userLevel || 0);
      } else {
        userLevel = 0;
      }

      if (userLevel >= p) {
        return !(isAuthed && b && b.indexOf(userId) >= 0);
      }

      return Boolean(isAuthed && a && a.indexOf(userId) >= 0);
    };
  }
}
/*
Permission Object

{
  c: {
    p: 2,
    a: [],
    b: [],
  },
  r: {
    p: 0,
    a: [],
    b: [],
  },
  u: {
    p: 2,
    a: [],
    b: [],
  },
  d: {
    p: 3,
    a: [],
    b: [],
  },
}
*/
