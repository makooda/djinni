export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  profile: {
    phone_number: string;
    address: string;
    first_time_login: boolean;
    last_password_update: Date;
  };
}
