export interface UserProps {
  id?: string;
  email?: string;
  password?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface ProfileProps {
  id?: string;
  user_id?: string;
  first_name?: string;
  last_name?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
