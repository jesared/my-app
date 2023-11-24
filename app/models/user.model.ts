import mongoose, { Document, Schema, Model, Types, models } from 'mongoose';

interface UserDocument extends Document {
  firstName?: string;
  name?: string;
  email: string;
  password: string;
  createdAt?: Date;
  participants?: Types.ObjectId[];
}

interface UserModel extends Model<UserDocument> {}

const userSchema = new Schema<UserDocument, UserModel>({
  
  firstName: { type: String, required: false },
  name: { type: String, required: false },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  participants: [{ type: Types.ObjectId, ref: 'Participant' }],
});

const User = models.User || mongoose.model<UserDocument, UserModel>('User', userSchema);

export default User;
