import { NextResponse, NextRequest } from 'next/server';
import dbConnect from '@/lib/dbConnect'
import Test, { ITest } from '@/models/testModel';
import User from '@/models/userModel';


export async function POST(req: NextRequest) {
    await dbConnect();
  
    try {
      const { subject, categories, marks, username }: ITest = await req.json();
  
      // if ( !subject || !marks || !username) {
      //   return NextResponse.json({ error: 'subject, category, and marks are required' }, { status: 400 });
      // }
  
      
      const newTest = new Test({ subject, categories, marks, username });
      await newTest.save();

      const user = await User.findOne({ username });

      if (user) {
          const today = new Date().toISOString().split('T')[0]; // Get today's date in ISO format (YYYY-MM-DD)
          // Add today's date to activeDays if not already present
          if (!user.activeDays.includes(today)) {
              user.activeDays.push(today);
              await user.save();
          }
      } else {
          return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
  
      return NextResponse.json(newTest, { status: 201 });
    } catch (error: any) {
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
  }
  
  export async function GET(req: NextRequest) {
    await dbConnect();
  
    try {
      const url = new URL(req.url);
      const username = url.searchParams.get('username');
  
      if (!username) {
        return NextResponse.json({ error: 'Username is required' }, { status: 400 });
      }
  

      const submission: ITest[] = await Test.find({
        username
      }).sort({ createdAt: -1 })
      .limit(10)
      .exec();

  
      return NextResponse.json(submission);
    } catch (error: any) {
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
  }
