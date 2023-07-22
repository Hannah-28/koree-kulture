// /api/orders/:id
import { getSession } from 'next-auth/react';

import db from '../../../utils/db';
import Order from '../../../models/Orders';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send('Sign-in required');
  }

  await db.connect();

  const order = await Order.findById(req.query.id);
  await db.disconnect();
  res.send(order);
};

export default handler;
