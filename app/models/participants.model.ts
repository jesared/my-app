import mongoose, { Document, Schema, Types, models } from 'mongoose';

enum Sexe {
  HOMME = 'Homme',
  FEMME = 'Femme',
}

interface PresenceDay {
  selected: boolean;
}

interface ParticipantDocument extends Document {
  licence: string;
  bibNumber?: number;
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber?: string;
  pointphase: number;
  registeredAt: Date;
  presenceDays: PresenceDay[];
  sexe: Sexe;
  selectedEpreuves: { idEpreuve: string; selected: boolean; name: string }[];
  user: Types.ObjectId;
}

interface ParticipantModel extends mongoose.Model<ParticipantDocument> {}

const participantSchema = new Schema<ParticipantDocument, ParticipantModel>({
  licence: { type: String, required: true, unique: true },
  bibNumber: { type: Number },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String },
  pointphase: { type: Number, required: true },
  registeredAt: { type: Date, default: Date.now },
  presenceDays: [{
    type: Boolean,
    default: false,
  }],
  sexe: {
    type: String,
    enum: Object.values(Sexe),
  },
  // Assurez-vous que selectedEpreuves est défini comme suit dans votre modèle Participant
selectedEpreuves: [{ 
  idEpreuve: { type: Schema.Types.ObjectId, ref: 'Epreuve' }, 
  selected: { type: Boolean, default: false },
  name: {type: String }
}],

  user: { type: Schema.Types.ObjectId, ref: 'User' }, // Champ de référence à l'utilisateur
});

const Participant = models.Participant || mongoose.model<ParticipantDocument, ParticipantModel>('Participant', participantSchema);

export { Participant, Sexe };    
export type { ParticipantDocument, PresenceDay };
