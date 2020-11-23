export interface PermissionRole {
  permissionRoleId: number;
  permissionRoleName: string;
  permissionRoleLabelName: string;
  permissionRoleDescription: string;
  canAssignRoles: boolean;
}

export const emptyPermissionRole = (): PermissionRole => {
  return {
    permissionRoleId: -1,
    permissionRoleName: '',
    permissionRoleLabelName: '',
    permissionRoleDescription: '',
    canAssignRoles: false,
  };
};
