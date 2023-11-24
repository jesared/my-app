import connectDB from '@/lib/mongodb'
import User from '@/app/models/user.model';
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req:any) {
    
    try {
        const { name, email, password } = await req.json();
        
        const hashedPassword = await bcrypt.hash(password, 10)
        await connectDB();

        console.log("Data received:", { name, email, password: hashedPassword });

        await User.create({ name, email, password: hashedPassword });

        return NextResponse.json({ message: "user registered." }, { status: 201 });

    } catch (error) {
        return NextResponse.json(
            { message: "An error occurred while registering th user."},
            { status: 500}
        )
        
    }
    
}

