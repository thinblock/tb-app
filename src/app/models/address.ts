interface IAddressData {
  address: string;
  created_at: Date;
}

export interface IAddress {
  loading: boolean;
  error: boolean;
  address: string;
  addresses: IAddressData[];
  errorMessage: string;
  lastVisible: any;
}

export interface IAddressAction {
  type?: string;
  payload: any | { error: string; message: string; statusCode: number; };
  error: boolean;
}
