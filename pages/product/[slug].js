import Image from 'next/image';
// import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import Layout from '../../components/Layout';
import { toast } from 'react-toastify';
import { Store } from '../../utils/Store';
import db from '../../utils/db';
import Product from '../../models/Product';
import axios from 'axios';

export default function ProductScreen(props) {
  const { product } = props;
  const { state, dispatch } = useContext(Store);

  // const router = useRouter();
  if (!product) {
    return <Layout title="Product Not Found">Product Not Found</Layout>;
  }

  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      return toast.error('Sorry. Product is out of stock');
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    toast.success(`${product.name} has been added to Cart`);
    // router.push('/cart');
    // alert(`${product.name} has been added to Cart`)
  };

  return (
    <Layout title={product.name}>
      <div className="grid md:grid-cols-2 gap-6 mx-4 lg:mx-16">
        <div className="md:col-span-1 grid grid-cols-1 gap-6">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
            priority
          />
          <div className="flex gap-6 flex-wrap">
            {product.subImage.map((product, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product}
                key={i}
                alt={product}
                width={140}
                height={140}
                layout="responsive"
              />
            ))}
          </div>
        </div>
        <div className="md:col-span-1">
          <h1 className="text-2xl font-bold uppercase">{product.name}</h1>
          <p className="text-gray-700 font-normal mb-1">#{product.price}</p>
          <p className="my-4 font-thin lg:w-5/6">{product.description}</p>
          <div className="mb-2 flex lg:w-5/6 justify-between">
            <div>Status</div>
            <div>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</div>
          </div>
          <button
            className="primary-button w-full mt-8"
            onClick={addToCartHandler}
          >
            Add to Cart
          </button>
          {/* <div className="card p-5">
            <div className="mb-2 flex justify-between">
              <div>Price</div>
              <div>${product.price}</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div>Status</div>
              <div>{product.countInStock > 0 ? 'In Stock' : 'Unavailable'}</div>
            </div>
            <button
              className="primary-button w-full"
              onClick={addToCartHandler}
            >
              Add to Cart
            </button>
          </div> */}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  };
}
