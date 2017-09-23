function permission(PermPermissionStore, AuthService) {
  /**
   * Permission / skip condition for 'isAuthorized'
   */
  PermPermissionStore.definePermission('isAuthorized', () => {
    const isAuth = AuthService.isAuthenticated();
    return isAuth;
  });

  /**
   * Permission / skip condition for 'isNotAuthorized'
   */
  PermPermissionStore.definePermission('isNotAuthorized', () => {
    const isAuth = AuthService.isAuthenticated();
    return !isAuth;
  });
}

permission.$inject = ['PermPermissionStore', 'AuthService'];

export default permission;
