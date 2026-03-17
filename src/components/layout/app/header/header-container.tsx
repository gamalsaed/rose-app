import { getAllAddresses } from '@/lib/apis/address.api';
import { getUserToken } from '@/lib/utilits/get-token';
import Header from './header';

export default async function HeaderContainer() {
  const addresses = await getAllAddresses();
  const token = (await getUserToken()) ?? '';

  return <Header addresses={addresses} token={token} />;
}
