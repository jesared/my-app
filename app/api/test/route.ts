// app/api/userInfo.ts

import { RecupUserId } from '@/app/api/recupUserId/route';
import { NextApiResponse, NextApiRequest } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await RecupUserId();
    res.status(200).json({ message: 'User information retrieved successfully.' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'An error occurred while retrieving user information.' });
  }
}
