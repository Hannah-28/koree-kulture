import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../../components/Layout';
import data from '../../utils/data';

export default function ProductScreen() {
  const { query } = useRouter();
  const { slug } = query;
  const product = data.products.find((x) => x.slug === slug);
  if (!product) {
    return <div>Product Not Found</div>;
  }
  return (
    <Layout title={product.name}>
      <div className="py-2">
        <Link href="/">back to products</Link>
      </div>
      <div className="grid md:grid-cols-4 gap-6">
        <div className="md:col-span-2 grid grid-cols-1 gap-6">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
          />
          <div className='flex gap-6 flex-wrap'>
            {product.subImage.map((product, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product}
                key={i}
                alt={product}
                width={150}
                height={150}
                layout="responsive"
              />
            ))}
          </div>
        </div>
        <div className='md:col-span-2'>
          <div className="card p-5">
            <div className="mb-2 flex justify-between">
              <div>Price</div>
              <div>${product.price}</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div>Status</div>
              <div>{product.countInStock > 0 ? 'In Stock' : 'Unavailable'}</div>
            </div>
            <button className="primary-button w-full">Add to Cart</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
