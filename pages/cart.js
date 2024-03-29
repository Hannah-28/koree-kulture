import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import dynamic from 'next/dynamic';
import axios from 'axios';

function CartScreen() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
    toast.error(`${item.name} has been removed`);
  };
  const updateCartHandler = async (item, qty) => {
    const quantity = Number(qty);
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      return toast.error('Sorry. Product is out of stock');
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
    toast.success(`${item.name} has been updated`);
  };

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  return (
    <Layout title="Cart">
      <h1 className="mb-4 text-xl font-bold mx-4">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="mx-4">
          Cart is empty. <Link href="/">Go Shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5 mx-4">
          <div className="overflow-x-auto md:col-span-4 hidden md:block">
            <table className="min-w-full ">
              <thead className="border-b uppercase font-bold">
                <tr>
                  <th className="px-5 text-left">Item</th>
                  <th className="p-5 text-right">Price</th>
                  <th className="p-5 text-right">Quantity</th>
                  <th className="p-5 text-right">Size</th>
                  <th className="p-5 text-right">Subtotal</th>
                  <th className="p-5"></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.slug} className="border-b">
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
                    <td className="p-5 text-right">
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          updateCartHandler(item, e.target.value)
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-5 text-right">{item.size}</td>
                    <td className="p-5 text-right">
                      #{item.quantity * item.price}
                    </td>
                    <td className="p-5 text-center">
                      <button onClick={() => removeItemHandler(item)}>
                        <XMarkIcon className="h-5 w-5 text-red-600"></XMarkIcon>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
                <button onClick={() => removeItemHandler(item)}>
                  <p className="text-red-600 text-xs">REMOVE</p>
                </button>
              </div>
              <div className="col-span-2 grid content-between">
                <Link href={`/product/${item.slug}`}>
                  <a>
                    <p className="font-medium"> {item.name}</p>
                  </a>
                </Link>
                <p className='font-base'>Size:<span> {item.size}</span></p>
                <p className='font-medium'>#{item.quantity * item.price}</p>
                <select
                  value={item.quantity}
                  onChange={(e) => updateCartHandler(item, e.target.value)}
                >
                  {[...Array(item.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
                
              </div>
            </div>
          ))}
          <div className="my-20 md:col-span-4">
            <ul>
              <li>
                <div className="pb-3 text-xl">
                  CART TOTALS ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                  {cartItems.length > 1 ? (
                    <span>Items</span>
                  ) : (
                    <span>Item</span>
                  )}
                  )
                </div>
                <div className="mb-4 flex justify-between font-light border-b border-gray-300 pb-4">
                  <div className="font-normal">Subtotal</div>
                  <div>
                    #
                    {round2(
                      cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
                    )}
                  </div>
                </div>

                <div className="mb-4 flex justify-between font-light border-b border-gray-300 pb-4">
                  <div className="font-normal">Tax</div>
                  <div>
                    #
                    {round2(
                      cartItems.reduce((a, c) => a + c.quantity * c.price, 0) *
                        0.05
                    )}
                  </div>
                </div>
                <div className="mb-4 flex justify-between font-bold border-b border-gray-300 pb-4">
                  <div>Total</div>
                  <div>
                    #{' '}
                    {round2(
                      cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
                    ) +
                      round2(
                        cartItems.reduce(
                          (a, c) => a + c.quantity * c.price,
                          0
                        ) * 0.05
                      )}
                  </div>
                </div>
              </li>
              <li>
                <button
                  onClick={() => router.push('login?redirect=/shipping')}
                  className="primary-button w-1/3"
                >
                  Check Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
