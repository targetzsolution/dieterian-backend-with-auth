const allRoles: { [k: string]: string[] } = {
    user: [
      'manageAuthentication',
    ],
    admin: [
      'getUsers',
      'manageUsers',
      'manageAuthentication',
    ],
  };
  
  const roles = Object.keys(allRoles);
  const roleRights = new Map(Object.entries(allRoles));
  
  export { roles, roleRights };
  