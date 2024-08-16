import User from '@/app/models/user.model';
import connectDB from '@/lib/mongodb';
import { NextResponse, NextRequest } from "next/server";
import { getServerSession  } from 'next-auth/next';
import { authOptions } from "@/lib/auth"


export async function RecupUserId(): Promise<string | undefined> {

    // Assurez-vous d'avoir établi la connexion à la base de données
    await connectDB();
    
    const session = await getServerSession(authOptions)
    
    if (!session) {
        // Si la session n'est pas disponible, renvoyez undefined ou gestion d'erreur appropriée
       NextResponse.json({ error: 'Unauthorized' }, { status: 500 });
    }

    const userEmail = session?.user?.email || '';

    console.log('recupId', session)

    if (!userEmail) {
        // Gérer le cas où l'email n'est pas disponible dans la session
        return undefined;
    }
    try {
        // Rechercher l'utilisateur dans la base de données en fonction de l'email
        const userFromDB = await User.findOne({ email: userEmail });

        if (userFromDB) {
            // L'utilisateur a été trouvé dans la base de données
            const user = userFromDB._id.toString();
            console.log("User ID from database:", user);
            return user;
        } else {
            // L'utilisateur n'a pas été trouvé dans la base de données
            console.log("User not found in the database");
            NextResponse.json({ message: 'User not found in the database' }, { status: 404 });
        }
    } catch (error) {
        console.error("Error in RecupUserId:", error);
        NextResponse.json({ message: 'An error occurred in RecupUserId' }, { status: 500 });
    }
}
