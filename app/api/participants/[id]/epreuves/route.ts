// C:\Users\User\Desktop\tournoi-table-tennis\my-app\app\api\epreuves\route.ts

// import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/mongodb';

import { NextRequest, NextResponse } from 'next/server';

import { Participant } from '@/app/models/participants.model';
import mongoose from 'mongoose';


export async function POST(req: NextRequest, res: NextResponse) {

  try {
    await connectDB();

    if (req.method === 'POST') {
      const body = await req.json();

      const { selectedEpreuves, id } = body;

      const participant = await Participant.findOne({ _id: id });
      console.log('Participant found:', participant);


      if (!participant) {
        return NextResponse.json({ error: 'Participant not found.' });
      }


      const objectIdArray = Object.keys(selectedEpreuves).map((epreuveId: string) => {
        if (!epreuveId) {
          console.error("epreuveId est undefined ou null");
          return null;
        }

        const selectedValue = selectedEpreuves[epreuveId];

        if (selectedValue === undefined) {
          console.error(`La valeur associée à epreuveId ${epreuveId} est undefined`);
          return null;
        }

        try {
          const idEpreuve = new mongoose.Types.ObjectId(epreuveId);
          const selected = selectedValue;

          return {
            idEpreuve,
            selected,
          };
        } catch (error) {
          console.error(`Erreur lors de la création de l'ObjectId pour epreuveId ${epreuveId}:`, error);
          return null;
        }
      }).filter(Boolean) as { idEpreuve: mongoose.Types.ObjectId; selected: boolean }[];

      participant.selectedEpreuves = objectIdArray;

      await participant.save();

      return NextResponse.redirect('http://localhost:3000/dashboard/participants', { status: 307 });
    
    } else {
      // Méthode non autorisée pour cette route
      return NextResponse.json({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error('Error during POST request:', error);
    return NextResponse.json({ error: 'Une erreur s\'est produite.' });
  }
};

