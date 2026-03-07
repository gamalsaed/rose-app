import { getProducts } from '@/lib/apis/products.api';
import ProductsWrapper from './_components/products-wrapper';

export default async function ProductPage() {
  const initialPage = await getProducts({ page: 1, limit: 12 });

  if ('error' in initialPage) {
    return <p>Failed to load products</p>;
  }

  return (
    <main className="flex mx-auto px-20 gap-6 mt-16 min-h-[80vh]">
      <ProductsWrapper initialPage={initialPage} />
    </main>
  );
}
