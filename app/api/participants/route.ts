// api/participants/route.ts

import connectDB from '@/lib/mongodb';
import { NextResponse, NextRequest } from "next/server";
import { Participant } from '@/app/models/participants.model';

export const GET = async (req: NextRequest) => {
    
  try {
    await connectDB();

    if (req.method === 'GET') {
      // Gérer la méthode GET
      const participants = await Participant.find({});
      return NextResponse.json({ participants }, { status: 200 });
    } else if (req.method === 'POST') {
      // Gérer la méthode POST
      // ...
    } else {
      // Méthode non autorisée pour cette route
      return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
    }

  } catch (error) {
    // Gérer les erreurs
    return NextResponse.json({ error: 'Une erreur s\'est produite.' }, { status: 500 });
  }
}

// export const getParticipantById = async (id: string) => {
//   // Faites une requête à votre API ou à votre base de données pour obtenir le participant par ID
//   const response = await fetch(`/api/participants/${id}`);
//   const data = await response.json();
//   return data;
// };
