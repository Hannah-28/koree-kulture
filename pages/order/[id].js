import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useReducer } from 'react';
import Layout from '../../components/Layout';
import { getError } from '../../utils/error';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}
function OrderScreen() {
  // order/:id
  const { query } = useRouter();
  const orderId = query.id;

  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: '',
  });
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/${orderId}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    if (!order._id || (order._id && order._id !== orderId)) {
      fetchOrder();
    }
  }, [order, orderId]);
  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order;

  return (
    <Layout title={`Order ${orderId}`}>
      <h1 className="mb-4 text-xl mx-4">{`Order ${orderId}`}</h1>
      {loading ? (
        <div className="mx-4">Loading...</div>
      ) : error ? (
        <div className="alert-error">{error}</div>
      ) : (
        <div className="grid mx-4 md:grid-cols-5 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <div className="overflow-x-auto card p-5">
              <h2 className="mb-2 text-lg">Shipping Address</h2>
              <h3>{shippingAddress.fullName}</h3>
              <div className="italic mt-2">
                {shippingAddress.address}, {shippingAddress.city},{' '}
                {shippingAddress.postalCode}, {shippingAddress.country}
              </div>
              {isDelivered ? (
                <div className="alert-success">Delivered at {deliveredAt}</div>
              ) : (
                <div className="alert-error">Not delivered</div>
              )}
            </div>

            <div className="card overflow-x-auto p-5">
              <h2 className="mb-2 text-lg">Payment Method</h2>
              <div>{paymentMethod}</div>
              {isPaid ? (
                <div className="alert-success">Paid at {paidAt}</div>
              ) : (
                <div className="alert-error">Not paid</div>
              )}
            </div>

            <div className="card overflow-x-auto p-5">
              <h2 className="mb-2 text-lg">Order Items</h2>
              <table className="min-w-full hidden md:block">
                <thead className="border-b uppercase font-bold">
                  <th className="px-5 text-left">Item</th>
                  <th className="p-5 text-right">Price</th>
                  <th className="p-5 text-right">Quantity</th>
                  <th className="p-5 text-right">Size</th>
                  <th className="p-5 text-right">Subtotal</th>
                </thead>
                <tbody>
                  {orderItems.map((item) => (
                    <tr key={item._id} className="border-b">
                      <td>
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
              {orderItems.map((item) => (
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
            </div>
          </div>
          <div className="overflow-x-auto md:col-span-2">
            <div className="card overflow-x-auto p-5">
              <h2 className="mb-2 text-lg">Order Summary</h2>
              <ul>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Items</div>
                    <div>#{itemsPrice}</div>
                  </div>
                </li>{' '}
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
              </ul>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

OrderScreen.auth = true;
export default OrderScreen;
