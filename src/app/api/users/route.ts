// import { NextResponse, NextRequest } from 'next/server';
// import { NextApiRequest } from 'next';
// import dbConnect from '../../../lib/dbConnect';
// import User, { IUser } from '../../../models/userModel';

// export async function GET(req: NextApiRequest) {
//   await dbConnect();

//   const {username } = req.body;

//   try {
//     if (!username) {
//       return NextResponse.json({ error: 'Username parameter is required' }, { status: 400 });
//     }

//     const user: IUser | null = await User.findOne({ username });

//     if (!user) {
//       return NextResponse.json({ error: 'User not found' }, { status: 404 });
//     }

//     return NextResponse.json(user);
//   } catch (error: any) {
//     console.error('Error fetching user data:', error);
//     return NextResponse.json({ success: false, message: error.message }, { status: 500 });
//   }
// }
