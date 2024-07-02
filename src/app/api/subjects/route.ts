import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse, NextRequest } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import Subject, { ISubject } from '../../../models/subjectModel';


// Handler for GET requests
export async function GET(){
  await dbConnect();
  try {
      const subjects: ISubject[] = await Subject.find();
      if(subjects){
      return  NextResponse.json(subjects);
      }
      throw new Error('something went wrong');
  } catch (error:any) {
      return  NextResponse.json({ success: false, message: error.message });
  }
}


export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { name, image, categories }: ISubject = await req.json();

    if (!name || !image || !categories) {
      return NextResponse.json({ error: 'Name, image, and categories are required' }, { status: 400 });
    }

    // Create a new subject in the database
    const newSubject = new Subject({ name, image, categories });
    await newSubject.save();

    return NextResponse.json(newSubject, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}