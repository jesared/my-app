// api/participants/[id].ts

import connectDB from '@/lib/mongodb';

import { NextResponse, NextRequest } from 'next/server';
import { Participant } from '@/app/models/participants.model';
import { Epreuve } from '@/app/models/epreuves.model';

export const GET = async (req: NextRequest, { params: { id } }: { params: { id: string } }) => {

  try {
    await connectDB();

    if (req.method === 'GET') {
      // Gérer la méthode GET
      const participant = await Participant.findById(id);


      if (!participant) {
        return NextResponse.json({ message: 'Participant not found' }, { status: 404 });
      }

      // Récupérez la liste complète des épreuves
      // const allEpreuves = await Epreuve.find({});
      const selectedEpreuves = await Epreuve.find({ _id: { $in: participant.selectedEpreuves.map((selected: { idEpreuve: any; }) => selected.idEpreuve) } });
      // Créez un tableau pour stocker les épreuves avec la propriété 'checked'
      // Créer un tableau pour stocker les épreuves avec la propriété 'checked'
      const epreuvesWithChecked = selectedEpreuves.map(epreuve => {
        return {
          _id: epreuve._id,
          name: epreuve.name,
          detail: epreuve.detail,
          checked: true,
        };
      });


      return NextResponse.json({ participant, epreuvesWithChecked }, { status: 200 });
    } else {
      // Méthode non autorisée pour cette route
      return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
    }
  } catch (error) {
    // Gérer les erreurs
    return NextResponse.json({ error: 'Une erreur s\'est produite.' }, { status: 500 });
  }
};
