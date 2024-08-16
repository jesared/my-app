/* eslint-disable react/no-unescaped-entities */
'use client';

import { NextResponse } from "next/server";
import { useState } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button";
import { SmilePlus } from "lucide-react";
import { toast } from "react-toastify";

export const AddParticipantComponent = () => {

  const [licence, setLicence] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [pointphase, setPointphase] = useState(Number);
  const [sexe, setSexe] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Nouvel état pour stocker les messages d'erreur

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/participant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          licence, firstname, lastname, email, pointphase, sexe
        }),
      });

      if (response.ok) {
        // Réinitialiser les messages d'erreur en cas de succès
        toast.success('Participant created successfully!', { delay: 800 });
      } else {
        // Si la réponse n'est pas réussie, gérer les erreurs
        const error = await response.json();

        if (error.code === 11000 && error.keyPattern && error.keyPattern.licence) {
          // Gérer l'erreur de violation d'index unique pour le champ 'licence'
          setErrorMessage('Le numéro de licence existe déjà.');
        } else {
          // Gérer d'autres erreurs
          console.error('Une erreur s\'est produite lors du traitement des données:', error);
          setErrorMessage('Une erreur s\'est produite lors du traitement des données.');
        }
      }
    } catch (error:any) {
      console.log('Erreur capturée:', error);

      if (error.code === 11000 && error.keyPattern && error.keyPattern.licence) {
        console.error('Erreur de duplication de la licence:', error);
        setErrorMessage('Le numéro de licence existe déjà.');
      } else {
        console.error('Une erreur s\'est produite lors du traitement des données:', error);
        setErrorMessage('Une erreur s\'est produite lors du traitement des données.');
      }
    }
  }
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Ajouter un participant</CardTitle>
        <CardDescription>
          Bienvenue sur l'ajout d'un participant
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-1">
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="licence">Numéro de licence</Label>
              <Input id="licence" name="licence" placeholder="entrer le numéro de licence" onChange={(e: any) => setLicence(e.target.value)} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="firstname">Nom</Label>
              <Input id="firstname" name="firstname" placeholder="entrer le nom" onChange={(e: any) => setFirstname(e.target.value)} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="lastname">Prénom</Label>
              <Input id="lastname" name="lastname" placeholder="entrer le prénom" onChange={(e: any) => setLastname(e.target.value)} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input type="email" name="email" id="email" placeholder="email pour pouvoir le contacter" onChange={(e: any) => setEmail(e.target.value)} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="pointphase">Point phase</Label>
              <Input type="number" name="pointphase" id="pointphase" placeholder="important les points phase" onChange={(e: any) => setPointphase(e.target.value)} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="sexe">Important pour l'epreuve féminine</Label>
              <RadioGroup name="sexe" defaultValue="sexe" onChange={(e: any) => setSexe(e.target.value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Homme" id="HOMME" />
                  <Label htmlFor="HOMME">Messieur</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Femme" id="FEMME" />
                  <Label htmlFor="FEMME">Dame</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Button type="submit" variant="default">
                <SmilePlus className="mr-2 w-5 h-5" />
                ajouter-le
              </Button>
            </div>
          </div>
           {/* Afficher le message d'erreur */}
           {errorMessage && <div className="text-red-500">{errorMessage}</div>}
        </form>
      </CardContent>
    </Card>
  )
}