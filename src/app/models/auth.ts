export interface IAuth {
  loading: boolean;
  error: boolean;
  errorMessage: string;
  isLoggedIn: boolean;
}

export interface IAuthAction {
  type?: string;
  payload: any | { error: string; message: string; statusCode: number; };
  error: boolean;
}
