import type { NextApiRequest, NextApiResponse } from 'next';
import { encrypt } from '../../../utils/encrypt';
import { getFsAirlinesToken } from '../../../utils/get-fsairlines-token';

const tokenEndpoint = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).end('Method Not Allowed');
    return;
  }

  if (req.headers['content-type'] !== 'application/json') {
    res.status(415).end('Unsupported Media Type');
    return;
  }

  const { vaId } = req.query;
  try {
    const { username, password } = req.body;
    const token = await getFsAirlinesToken(username, password, String(vaId));
    if (!token) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }
    res.status(200).json({ token: encrypt(token) });
  } catch (e) {
    res.status(500).end(e.message);
  }
};

export default tokenEndpoint;
