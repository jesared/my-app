'use client';

// pages/participants/[id].tsx

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import { ParticipantDocument } from '@/app/models/participants.model';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import ParticipantEpreuvesForm from '@/components/form/participant-epreuve.from';


const ParticipantDetailPage = () => {
  const {id} = useParams();



  const [participant, setParticipant] = useState<ParticipantDocument | null>(null);
  

  useEffect(() => {
    const fetchParticipant = async () => {
      try {
        const response = await fetch(`/api/participants/${id}`);
        const data = await response.json();

        if (!data) {
          throw new Error('Réponse JSON vide ou non valide');
        }
       
          setParticipant(data.participant);
       
        console.log('participant', data)
      } catch (error) {
        console.error('Error fetching participant details:', error);
      }
    };

    if (id) {
      fetchParticipant();
    }
  }, [id]);

  if (!participant) {
    return <div>Loading...</div>;
  }

  // Affichez les détails du participant
  return (
    <div>
      
      <Card>
        <CardHeader>
          <CardTitle>
          {participant && (
        <>{participant.firstname} {participant.lastname}</>
      )} : { ' ' }
          </CardTitle>
          <CardDescription>{participant.licence}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{participant.pointphase}</p>
        </CardContent>
        <CardFooter>
          <p>{participant.email}</p>
        </CardFooter>
      </Card>
      {participant ? (
      <ParticipantEpreuvesForm participant={participant} />
    
      ) : (
        <p>Chargement des données du participant...</p>

      )}
    </div>


  );
};

export default ParticipantDetailPage;
