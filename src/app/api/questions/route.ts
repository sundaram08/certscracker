import { NextResponse, NextRequest } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import Question, { IQuestion } from '../../../models/questionModel';



export async function GET(req: NextRequest) {
    await dbConnect();
  
    try {
      const url = new URL(req.url);
      const subject = url.searchParams.get('subject');
      const categories = url.searchParams.get('categories')?.split(',');
  
      if (!subject || !categories) {
        return NextResponse.json({ error: 'Subject and categories are required' }, { status: 400 });
      }
  
      // Find questions with the specified subject and matching categories
      const questions: IQuestion[] = await Question.find({
        subject,
        category: { $in: categories }
      });
  
      return NextResponse.json(questions);
    } catch (error: any) {
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
  }


export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { description, subject, category, options }: IQuestion = await req.json();

    if (!description || !subject || !category || !options) {
      return NextResponse.json({ error: 'Description, subject, category, and options are required' }, { status: 400 });
    }

    
    if (options.length !== 4) {
      return NextResponse.json({ error: 'A question must have exactly 4 options' }, { status: 400 });
    }

    const correctOptions = options.filter((option) => option.isCorrect);
    if (correctOptions.length !== 1) {
      return NextResponse.json({ error: 'Exactly one option must be marked as correct' }, { status: 400 });
    }

    
    const newQuestion = new Question({ description, subject, category, options });
    await newQuestion.save();

    return NextResponse.json(newQuestion, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
