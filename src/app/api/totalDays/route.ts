import { NextResponse, NextRequest } from 'next/server';
import { NextApiRequest } from 'next';
import dbConnect from '@/lib/dbConnect';
import User, { IUser } from '@/models/userModel';

export async function GET(req: NextRequest) {
  await dbConnect();

  const { searchParams } = req.nextUrl;
  const username = searchParams.get('username');
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json({ message: 'User not found' });
    }
    return NextResponse.json({ totalDays: user.activeDays.length });
  } catch (error) {
    return NextResponse.json({ message: 'Server error' });
  }
}
