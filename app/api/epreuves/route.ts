// C:\Users\User\Desktop\tournoi-table-tennis\my-app\app\api\epreuves\route.ts

// import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/mongodb';
import { Epreuve } from '@/app/models/epreuves.model';
import { NextRequest, NextResponse } from 'next/server';
import { EpreuveModel } from '@/app/models/epreuves.model';


export async function GET(req: NextRequest, res: NextResponse) {
  try {
    await connectDB();

    if (req.method === 'GET') {
      // Gérer la méthode GET
      const epreuves: EpreuveModel[] = await Epreuve.find({});
      return NextResponse.json({ epreuves });
    } else {
      // Méthode non autorisée pour cette route
      return NextResponse.json({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des épreuves:', error);
    return NextResponse.json({ error: 'Une erreur s\'est produite lors de la récupération des épreuves.' }, { status: 500 });
  }
};
