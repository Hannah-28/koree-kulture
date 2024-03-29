import React, { useContext, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import CheckoutWizard from '../components/CheckoutWizard';
import Link from 'next/link';
import { Store } from '../utils/Store';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { getError } from '../utils/error';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function PlaceOrderScreen() {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems, shippingAddress, paymentMethod } = cart;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );
  const shippingPrice = round2(itemsPrice * 0.1);
  const taxPrice = round2(itemsPrice * 0.05);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  const router = useRouter();
  useEffect(() => {
    if (!paymentMethod) {
      router.push('/payment');
    }
  }, [paymentMethod, router]);

  const [loading, setLoading] = useState(false);
  const placeOrderHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post('/api/orders', {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
      setLoading(false);
      dispatch({ type: 'CART_CLEAR_ITEMS' });
      Cookies.set('cart', JSON.stringify({ ...cart, cartItems: [] }));
      router.push(`/order/${data._id}`);
    } catch (err) {
      setLoading(false);
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Place Order">
      <CheckoutWizard activeStep={3} />
      <h1 className="mb-4 text-xl font-bold mx-4">Place Order</h1>
      {cartItems.length === 0 ? (
        <div className="mx-4">
          Cart is empty. <Link href="/">Go Shopping</Link>
        </div>
      ) : (
        <div className="grid mx-4 md:grid-cols-5 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <div className="card overflow-x-auto p-5">
              <h2 className="mb-2 text-lg">Shipping Address</h2>
              <h3>{shippingAddress.fullName}</h3>
              <div className="italic mt-2">
                {shippingAddress.address}, {shippingAddress.city},{' '}
                {shippingAddress.postalCode}, {shippingAddress.country}
              </div>
              <div className="text-blue-700 mt-2">
                <Link href="/shipping">Edit</Link>
              </div>
            </div>
            <div className="card overflow-x-auto p-5">
              <h2 className="mb-2 text-lg">Payment Method</h2>
              <div>{paymentMethod}</div>
              <div className="text-blue-700 mt-2">
                <Link href="/payment">Edit</Link>
              </div>
            </div>
            <div className="card overflow-x-auto p-5">
              <h2 className="mb-2 text-lg">Order Items</h2>

              <table className="min-w-full hidden md:block">
                <thead className="border-b uppercase font-bold">
                  <tr>
                    <th className="px-5 text-left">Item</th>
                    <th className="p-5 text-right">Price</th>
                    <th className="p-5 text-right">Quantity</th>
                    <th className="p-5 text-right">Size</th>
                    <th className="p-5 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item._id} className="border-b">
                      <td className="py-4">
                        <Link href={`/product/${item.slug}`}>
                          <a className="flex items-center space-x-2">
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={90}
                              height={140}
                            />
                            <p className="font-medium"> {item.name}</p>
                          </a>
                        </Link>
                      </td>
                      <td className="p-5 text-right">#{item.price}</td>
                      <td className="p-5 text-right">{item.quantity}</td>
                      <td className="p-5 text-right">{item.size}</td>
                      <td className="p-5 text-right">
                        #{item.quantity * item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {cartItems.map((item) => (
                <div
                  key={item.slug}
                  className="block py-6 border-t gap-8 text-sm md:hidden grid grid-cols-3"
                >
                  <div className="col-span-1 grid space-y-10 content-between justify-center">
                    <Link href={`/product/${item.slug}`}>
                      <a>
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={90}
                          height={140}
                        />
                      </a>
                    </Link>
                  </div>
                  <div className="col-span-2 grid content-between">
                    <Link href={`/product/${item.slug}`}>
                      <a>
                        <p className="font-medium"> {item.name}</p>
                      </a>
                    </Link>
                    <p className="font-base">
                      Size:<span> {item.size}</span>
                    </p>
                    <p className="font-base">
                      Quantity:<span> {item.quantity}</span>
                    </p>
                    <p className="font-medium">#{item.quantity * item.price}</p>
                  </div>
                </div>
              ))}
              <div className="text-blue-700 mt-2">
                <Link href="/cart">Edit</Link>
              </div>
            </div>
            <div></div>
          </div>
          <div className="md:col-span-2 overflow-x-auto">
            <div className="card overflow-x-auto p-5">
              <h2 className="mb-2 text-lg">Order Summary</h2>
              <ul>
                <li>
                  <div className="mb-2 flex justify-between">
                    {cartItems.length > 1 ? <div>Items</div> : <div>Item</div>}
                    <div>#{itemsPrice}</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Tax</div>
                    <div>#{taxPrice}</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Shipping</div>
                    <div>#{shippingPrice}</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between font-bold">
                    <div>Total</div>
                    <div>#{totalPrice}</div>
                  </div>
                </li>
                <li>
                  <button
                    disabled={loading}
                    onClick={placeOrderHandler}
                    className="primary-button w-full"
                  >
                    {loading ? 'Loading' : 'Place Order'}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

PlaceOrderScreen.auth = true;
