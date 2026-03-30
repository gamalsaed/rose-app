export type Address = {
  street: string;
  phone: string;
  city: string;
  lat: string;
  long: string;
  username: string;
  _id: string;
};

export type Addresses = Address[];

export type AddressesApi = Promise<{
  message: string;
  addresses: Addresses;
}>;
