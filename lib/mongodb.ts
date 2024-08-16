import mongoose from 'mongoose';

const MONGODB_URI = process.env.BDD_URL;

const connectDB = async () => {
  if (!MONGODB_URI) {
    console.error('La variable d\'environnement BDD_URL est indéfinie.');
    process.exit(1);
  }

  try {
    // Connexion à MongoDB avec un délai d'attente prolongé
    const connection = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 30000, // Augmente le délai de sélection du serveur
    });

    // Utilisation des événements pour vérifier l'état de la connexion
    mongoose.connection.once('open', () => {
      console.log('Connexion à MongoDB réussie via l\'événement "open".');
    });

    mongoose.connection.on('error', (err) => {
      console.error('Erreur lors de la connexion à MongoDB via l\'événement "error":', err);
      process.exit(1);
    });

    const db = mongoose.connection.db;

    // Vérifiez que la connexion à la base de données est bien établie
    if (!db) {
      console.error('Erreur : la connexion à la base de données n\'est pas définie.');
      process.exit(1);
    }

    // Vérifiez si la collection 'users' existe déjà
    const collectionExists = await db.listCollections({ name: 'users' }).hasNext();

    // Si la collection 'users' n'existe pas, créez-la
    if (!collectionExists) {
      await db.createCollection('users');
      console.log('La collection "users" a été créée.');
    } else {
      console.log('La collection "users" existe déjà.');
    }

  } catch (error) {
    handleConnectionError(error);
  }
};

const handleConnectionError = (error: unknown) => {
  if (error instanceof Error) {
    console.error('Erreur de connexion à MongoDB:', error.message);
  } else {
    console.error('Erreur inconnue de connexion à MongoDB:', error);
  }
  process.exit(1);
};

export default connectDB;
