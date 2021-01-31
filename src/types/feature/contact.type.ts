import { Base } from './base.type';

export interface PermissionRole extends Base<PermissionRole> {
  permissionRoleId: number;
  permissionRoleName: string;
  permissionRoleLabelName: string;
  permissionRoleDescription: string;
  canAssignRoles: boolean;
}

export const emptyPermissionRole = (): PermissionRole => {
  const defaultValues: PermissionRole = {
    permissionRoleId: -1,
    permissionRoleName: '',
    permissionRoleLabelName: '',
    permissionRoleDescription: '',
    canAssignRoles: false,
  };

  return {
    ...defaultValues,
    meta: defaultValues,
  };
};
