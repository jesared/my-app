// db.ts
import mongoose from 'mongoose';

const MONGODB_URI = process.env.BDD_URL;

const connectDB = async () => {
    if (MONGODB_URI === undefined) {
        console.error('La variable d\'environnement MONGODB_URL est indéfinie.');
        process.exit(1); // Quitte le processus Node.js avec un code d'erreur
      }

    try {
      await mongoose.connect(MONGODB_URI, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        // useCreateIndex: true,
      });

      // Vérifiez si la collection 'users' existe déjà
      const collectionExists = await mongoose.connection.db.listCollections({ name: 'users' }).hasNext();

      // Si la collection 'users' n'existe pas, créez-la
      if (!collectionExists) {
          await mongoose.connection.db.createCollection('users');
      }

      console.log('Connexion à MongoDB réussie');
    } catch (error) {
      handleConnectionError(error);
    }
  };
  
  const handleConnectionError = (error: unknown) => {
    if (error instanceof Error) {
      console.error('Erreur de connexion à MongoDB:', error.message);
      process.exit(1); // Quitte le processus Node.js avec un code d'erreur
    } else {
      console.error('Erreur inconnue de connexion à MongoDB:', error);
      process.exit(1); // Quitte le processus Node.js avec un code d'erreur
    }
  };
  
  export default connectDB;
