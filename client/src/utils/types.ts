export type CurrentUser = {
  email?: string;
  iat?: number;
  id?: string;
  username?: string;
  loggedIn: boolean;
  loading: boolean;
};

export type Method =
  | 'get'
  | 'put'
  | 'patch'
  | 'post'
  | 'delete'
  | 'options'
  | 'head'
  | 'request';

export interface Constraints {
  audio: boolean;
  video:
    | {
        width: number;
        height: number;
      }
    | boolean;
}
