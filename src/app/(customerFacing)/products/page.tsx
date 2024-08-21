import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard";
import { cache } from "@/lib/cache";
import { Suspense } from "react";
import db  from "@/db/db";

const getProducts = cache(() => {
  return db.product.findMany({where: {isAvailable: true}, orderBy: {name:"asc"}});
}, ["/", "getProducts"])

// const getProducts = cache(async () => {
//   try {
//     const products = await db.product.findMany({
//       where: { isAvailable: true },
//       orderBy: { name: "asc" }
//     });
//     return products;
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     return [];
//   }
// }, ["/", "getProducts"]);

export default function ProductsPage() {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Suspense
          fallback={
            <>
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </>
          }
        >
          <ProductsSuspense />
        </Suspense>
      </div>
    )
  }

  async function ProductsSuspense() {
    const products = await getProducts();
    return products.map(product => (
      <ProductCard key={product.id} {...product} />
    ));
  }