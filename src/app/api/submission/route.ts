import { NextResponse, NextRequest } from 'next/server';
import dbConnect from '@/lib/dbConnect'
import Test, { ITest } from '@/models/testModel';


export async function POST(req: NextRequest) {
    await dbConnect();
  
    try {
      const { subject, categories, marks, username }: ITest = await req.json();
  
      // if ( !subject || !marks || !username) {
      //   return NextResponse.json({ error: 'subject, category, and marks are required' }, { status: 400 });
      // }
  
      
      const newTest = new Test({ subject, categories, marks, username });
      await newTest.save();
  
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
