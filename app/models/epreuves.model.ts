// models/epreuves.model.ts
import mongoose, { Document, Schema } from 'mongoose';

enum Sexe {
  HOMME = 'Homme',
  FEMME = 'Femme',
}

export interface EpreuveModel extends Document {

  _id: mongoose.Types.ObjectId;
  name: string;
  date: Date;
  heure: string;
  detail: string;
  pointMin: number;
  pointMax: number;
  tarif: number;
  selected: boolean;
  sexe?: Sexe;
}

const epreuveSchema = new Schema<EpreuveModel>({
  _id: Schema.Types.ObjectId,
  name: { type: String, required: true },
  date: { type: Date, required: true },
  heure: { type: String, required: true },
  detail: { type: String, required: true },
  pointMin: { type: Number, required: true },
  pointMax: { type: Number, required: true },
  tarif: { type: Number, required: true },
  selected: { type: Boolean, default: false },
  sexe: { type: String, enum: ['Homme', 'Femme'] }, 
});


const Epreuve = mongoose.models.Epreuve || mongoose.model('Epreuve', epreuveSchema);

export { Epreuve, epreuveSchema };
