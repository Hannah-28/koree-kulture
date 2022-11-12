/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';

export default function ProductItem({ product }) {
  return (
    <div className="card">
      <Link href={`/product/${product.slug}`}>
        <a>
          <img src={product.image} alt={product.name} className="w-full" />
        </a>
      </Link>

      <div className="flex flex-col items-center justify-center p-5 bg-gray-50 w-full">
        <Link href={`/products/${product.slug}`}>
          <a className='mb-1'>
            <h2 className="text-md font-semibold uppercase">{product.name}</h2>
          </a>
        </Link>
        <p className='text-gray-700 font-normal mb-1'>#{product.price}</p>
        <a className="primary-button" href={`/product/${product.slug}`}>
          View
        </a>
      </div>
    </div>
  );
}
