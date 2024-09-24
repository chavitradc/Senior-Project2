import { NextResponse } from "next/server";
import User from "../../../../models/user";
import { connectMongoDB } from "../../../../lib/mongodb";


export async function POST(req : Request) {
    try {
        await connectMongoDB();
        const { username } = await req.json();
        const user = await User.findOne({username}).select("_id");
        console.log("User: ",user)
        return NextResponse.json({user})
    } catch(error) {
       console.log(error)
}}