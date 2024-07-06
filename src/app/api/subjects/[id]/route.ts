import { NextResponse, NextRequest } from 'next/server';
import dbConnect from '@/lib/dbConnect'
import Subject, { ISubject } from '@/models/subjectModel';

export async function GET(req:NextRequest){
    const subject = req.nextUrl.pathname.split('/').pop();
    await dbConnect();
    try {
        const categories = await Subject.findOne({ name:subject }).select('categories');
        if(categories){
        return  NextResponse.json(categories);
        }
        throw new Error('something went wrong');
    } catch (error:any) {
        return  NextResponse.json({ success: false, message: error.message });
    }
}
