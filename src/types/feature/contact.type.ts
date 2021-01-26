import { Base } from './base.type';

export interface PermissionRole extends Base<PermissionRole> {
  permissionRoleId: number;
  permissionRoleName: string;
  permissionRoleLabelName: string;
  permissionRoleDescription: string;
  canAssignRoles: boolean;
}

const defaultValues: PermissionRole = {
  permissionRoleId: -1,
  permissionRoleName: '',
  permissionRoleLabelName: '',
  permissionRoleDescription: '',
  canAssignRoles: false,
};

export const emptyPermissionRole = (): PermissionRole => ({
  ...defaultValues,
  meta: defaultValues,
});
