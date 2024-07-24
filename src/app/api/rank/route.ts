import { NextResponse, NextRequest } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/userModel';

export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    const username = req.nextUrl.searchParams.get('username');
    
    if (!username) {
      return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const users = await User.find().sort({ totalScore: -1 });
    const rank = users.findIndex(u => u.username === username) + 1;

    return NextResponse.json({ rank }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
