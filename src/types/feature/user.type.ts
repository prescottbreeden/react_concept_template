import { randomString } from 'utilities/general.utils';
import { Base, emptyBase } from './base.type';
import { Address, emptyAddress } from './address.type';
import { emptyPhone, Phone } from './phone.type';
import { PermissionRole } from './contact.type';

export interface User extends Base<User> {
  aadB2cId: string;
  address: Address;
  dob?: Date;
  firstName: string;
  id: string;
  isActive: boolean;
  lastName: string;
  loginEmail: string;
  middleName?: string;
  permissionRoles: PermissionRole[];
  title: string;
  emails: string[];
  phones: Phone[];
}

export const emptyUser = (): User => ({
  ...emptyBase<User>(),
  address: emptyAddress(),
  aadB2cId: '',
  firstName: '',
  id: randomString(),
  isActive: true,
  lastName: '',
  loginEmail: '',
  permissionRoles: [],
  title: '',
  emails: [],
  phones: [emptyPhone()],
});
