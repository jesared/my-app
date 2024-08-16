

import connectDB from '@/lib/mongodb';

import { NextResponse, NextRequest } from "next/server";
import { Participant } from '@/app/models/participants.model';
import { RecupUserId } from '@/app/api/recupUserId/route';
import { toast } from 'react-toastify';

export async function POST(req: any, res: any) {

    try {
        await connectDB();

        const user = await RecupUserId();

        // Récupérez le dernier participant trié par ordre décroissant du numéro de bibliothèque
        const lastParticipant = await Participant.findOne().sort({ bibNumber: -1 });

        // Calculez le nouveau numéro de bibliothèque en ajoutant 1
        const newBibNumber = lastParticipant ? lastParticipant.bibNumber + 1 : 1;
        const bibNumber = newBibNumber;

        NextResponse.json({ message: 'User information retrieved successfully.' }, { status: 200 });


        const { licence, firstname, lastname, email, pointphase, sexe } = await req.json();


        await Participant.create({ licence, firstname, lastname, email, pointphase, sexe, user, bibNumber });

        console.log("Participant created successfully!");

        return NextResponse.json({ message: "participant registered." }, { status: 201 });

    } catch (error:any) {
        console.error("MongoDB error:", error);

        // Gérer l'erreur de licence unique
  if (error.code === 11000 && error.keyPattern.licence) {
        return NextResponse.json({ message: 'Licence number already exists.' }, { status: 400 });
      }

        return NextResponse.json(
            { message: "An error occurred while registering th participant." },
            { status: 500 }
        )

    }

}

