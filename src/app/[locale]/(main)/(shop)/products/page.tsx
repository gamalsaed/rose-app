import { getProducts } from "@/lib/apis/products.api";
import ProductsWrapper from "./_components/products-wrapper";
import { getUserToken } from "@/lib/utilits/get-token";

export default async function HomePage() {
  const response = await getProducts({ page: 1, limit: 12 });

 console.log(await getUserToken())

  if ("error" in response) {
    return <p>Failed to load products</p>;
  }

  return (
    <main className="flex mx-auto px-20 gap-6 mt-16 min-h-[80vh]">
      <ProductsWrapper initialPage={response} />
    </main>
  );
}
