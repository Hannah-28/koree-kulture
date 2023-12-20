import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useReducer } from "react";
import Layout from "../../components/Layout";
import { getError } from "../../utils/error";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, order: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "PAY_REQUEST":
      return { ...state, loadingPay: true };
    case "PAY_SUCCESS":
      return { ...state, loadingPay: false, successPay: true };
    case "PAY_FAIL":
      return { ...state, loadingPay: false, errorPay: action.payload };
    case "PAY_RESET":
      return { ...state, loadingPay: false, successPay: false, errorPay: "" };
    default:
      state;
  }
}
function OrderScreen() {
  // order/:id
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const { query } = useRouter();
  const orderId = query.id;

  const [{ loading, error, order, successPay, loadingPay }, dispatch] =
    useReducer(reducer, {
      loading: true,
      order: {},
      error: "",
    });
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/orders/${orderId}`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    if (!order._id || successPay || (order._id && order._id !== orderId)) {
      fetchOrder();
      if (successPay) {
        dispatch({ type: "PAY_RESET" });
      }
    } else {
      const loadPaypalScript = async () => {
        const { data: clientId } = await axios.get("/api/keys/paypal");
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      loadPaypalScript();
    }
  }, [order, orderId, paypalDispatch, successPay]);
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

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: totalPrice / 1000 },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  }

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        dispatch({ type: "PAY_REQUEST" });
        const { data } = await axios.put(`/api/orders/${order._id}/pay`, details);
        dispatch({ type: "PAY_SUCCESS", payload: data });
        toast.success("Order is paid successfully");
      } catch (err) {
        dispatch({ type: "PAY_FAIL", payload: getError(err) });
        toast.error(getError(err));
      }
    });
  }

  function onError(err) {
    toast.error(getError(err));
  }

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
                {shippingAddress.address}, {shippingAddress.city},{" "}
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
          <div className="overflow-x-auto md:col-span-2 z-0">
            <div className="card overflow-x-auto p-5">
              <h2 className="mb-2 text-lg">Order Summary</h2>
              <ul>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Items</div>
                    <div>#{itemsPrice}</div>
                  </div>
                </li>{" "}
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
                {!isPaid && (
                  <li>
                    {isPending ? (
                      <div>Loading...</div>
                    ) : (
                      <div className="w-full z-0">
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                    )}
                    {loadingPay && <div>Loading...</div>}
                  </li>
                )}
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
