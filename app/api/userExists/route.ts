import User from "@/app/models/user.model";
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req:any) {
    try {
        await connectDB();
        const { email } = await req.json();
        const user = await User.findOne({ email }).select("_id");
        console.log('user', user);
        return NextResponse.json({ user });
    } catch (error) {
        console.log('error', error)
    }
}