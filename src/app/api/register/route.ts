import { NextResponse } from "next/server";
import User from "../../../../models/user";
import bcrypt from "bcryptjs"
import { connectMongoDB } from "../../../../lib/mongodb";

export async function POST(req : Request) {
    try {
        const {fname,lname,username,password} = await req.json();
        const hashedPassword = await bcrypt.hash(password,10);
        await connectMongoDB();
        await User.create({fname,lname,username,password:hashedPassword});


        return NextResponse.json({message:"User registered"},{status:201});
   
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch(error) {
        return NextResponse.json({message: "An error occurred white registrating the user."},{status: 500});
    }
}