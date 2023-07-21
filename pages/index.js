import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem';
import Product from '../models/Product';
9;
import db from '../utils/db';

export default function Home({ products }) {
  return (
    <Layout title="Home">
      <div className="w-full text-center mb-8 font-bold">
        <h1 className="text-xl">PRODUCTS</h1>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mx-4 lg:mx-16">
        {products.map((product) => (
          <ProductItem product={product} key={product.slug}></ProductItem>
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
