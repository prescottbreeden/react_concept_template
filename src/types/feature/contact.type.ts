export type Email = {
  id: string;
  email: string;
};

export type Contact = {
  id: string;
  firstName: string;
  lastName: string;
  isSubcribed: boolean;
  subscriptionEmail: string;
  emails: Email[];
  phones: Phone[];
};

export type Phone = {
  id: string;
  description: string;
  number: string;
};
