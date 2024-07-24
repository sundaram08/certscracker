import { NextResponse, NextRequest } from 'next/server';
import dbConnect from '@/lib/dbConnect'
import User from '@/models/userModel';
import { NextApiRequest } from 'next';
interface score {
    username: string,
    marks: number;
}

export async function POST(req: NextRequest) {
    await dbConnect();
  
    try {
      const { marks, username }:score = await req.json();

      const user = await User.findOne({ username });

      if (user) {
        user.totalScore = (user.totalScore || 0) + marks; // Increment totalScore
        await user.save(); // Save the updated user document
      } else {
          return NextResponse.json({ error: 'User not found' }, { status: 409 });
      }
  
      return NextResponse.json("successfully incremented", { status: 201 });
    } catch (error: any) {
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
  }

  export async function GET(req: NextRequest) {
    await dbConnect();
  
    try {
        const username = req.nextUrl.searchParams.get('username');
      const user = await User.findOne({ username });

      if (user) {
        
        return NextResponse.json({ score: user.totalScore || 0}, { status: 200 });
      } else {
          return NextResponse.json({ error: 'User not found' }, { status: 409 });
      }
  
      return NextResponse.json("successfully incremented", { status: 201 });
    } catch (error: any) {
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
  }
