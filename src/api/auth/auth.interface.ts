export enum AuthLogType {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}
export interface AuthLogProps {
  id?: string;
  user_id?: string;
  token?: string;
  type?: AuthLogType;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
