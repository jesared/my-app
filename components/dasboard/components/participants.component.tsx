/* eslint-disable react/no-unescaped-entities */
'use client';

import React, { useState, useEffect } from 'react';
import { ParticipantDocument } from '@/app/models/participants.model';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Loading from '@/components/loading/loading';
import { EditIcon, EyeIcon, TrophyIcon } from 'lucide-react';
import Link from 'next/link';
import { EpreuveModel } from '@/app/models/epreuves.model';




export const ParticipantsComponent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [participants, setParticipants] = useState<ParticipantDocument[]>([]);
  const [epreuves, setEpreuves] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const epreuvesResponse = await fetch('/api/epreuves', {
          cache: 'no-store',
        });

        if (!epreuvesResponse.ok) {
          console.error('Erreur lors de la récupération des epreuves :', epreuvesResponse.statusText);
          throw new Error(`Erreur lors de la récupération des epreuves : ${epreuvesResponse.statusText}`);
        }

        const epreuveData = await epreuvesResponse.json();
        setEpreuves(epreuveData.epreuves);

        const participantsResponse = await fetch('/api/participants', {
          cache: 'no-store',
        });

        if (!participantsResponse.ok) {
          console.error('Erreur lors de la récupération des participants :', participantsResponse.statusText);
          throw new Error(`Erreur lors de la récupération des participants : ${participantsResponse.statusText}`);
        }

        const participantsData = await participantsResponse.json();
        setParticipants(participantsData.participants);

        setIsLoading(false);  // Move setIsLoading(false) to the end after setting both epreuves and participants
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Card className='rounded-none'>
      <CardHeader className="pb-3">
        <CardTitle>Liste des participants</CardTitle>
        <CardDescription>
          Bienvenue sur la liste des participants
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-1">
        <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 text-accent-foreground transition-all">
          <div className="mx-auto w-full space-y-1">
            <Table>
              <TableCaption>Liste de participants</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead >Licence</TableHead>
                  <TableHead >Points</TableHead>
                  <TableHead >Prénom Nom</TableHead>
                  <TableHead >Epreuves</TableHead>
                  <TableHead >Jour 1</TableHead>
                  <TableHead >Jour 2</TableHead>
                  <TableHead >Jour 3</TableHead>
                  <TableHead >Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={4}><Loading /></TableCell>
                  </TableRow>
                ) : participants.length > 0 ? (
                  participants.map(async (participant, index) => (

                    <TableRow key={participant._id} className={index % 2 === 0 ? 'bg-slate-100' : ''}>
                      <TableCell >{participant.licence}</TableCell>
                      <TableCell>{participant.pointphase}</TableCell>
                      <TableCell>{participant.firstname + " " + participant.lastname}</TableCell>

                      <TableCell>
                        {participant.selectedEpreuves && participant.selectedEpreuves.length > 0 ? (
                          <div className="flex space-x-1">
                            {participant.selectedEpreuves
                              .filter(epreuve => epreuve.selected)
                              .map(async (epreuve) => {

                                try {
                                  const matchingEpreuve = epreuves.find((detail: { _id: string; name: string; }) => detail._id === epreuve.idEpreuve);
                                  const epreuveName = matchingEpreuve ? (matchingEpreuve as EpreuveModel).name : 'Épreuve inconnue';
                                  return <div key={epreuve.idEpreuve}>{epreuveName}</div>;
                                } catch (error) {
                                  console.error('Erreur lors de la récupération des détails de l\'épreuve :', error);
                                  return <div key={epreuve.idEpreuve}>Épreuve inconnue</div>;
                                }
                              })}
                          </div>
                        ) : (
                          <Link href={`/dashboard/participants/${participant._id}`}>
                            <div className='flex gap-1'>
                              <div><TrophyIcon size={15} className='text-gray-400' /></div>
                              <div className='text-gray-400 text-xs '>Pas d'épreuve</div>
                            </div></Link>
                        )}
                      </TableCell>
                      <TableCell><Checkbox /></TableCell>
                      <TableCell><Checkbox /></TableCell>
                      <TableCell><Checkbox /></TableCell>
                      <TableCell>
                        <div className='flex gap-2'>
                          <div><Link href={`/dashboard/participants/${participant._id}`}><EditIcon className='text-stone-600' /></Link></div>
                          <div><Link href="/"><EyeIcon className='text-stone-600' /></Link></div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4}>Aucun participant trouvé.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
