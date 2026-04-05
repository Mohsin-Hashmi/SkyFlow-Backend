export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'admin' | 'airlineOwner' | 'customer';
  createdAt?: string;
  updatedAt?: string;
}

export {};
