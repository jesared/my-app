/* eslint-disable react/no-unescaped-entities */
'use client';

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button";
import { SmilePlus } from "lucide-react";
import { redirect } from "next/navigation";



export const AddParticipantComponent = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch('/api/participant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        
        // Réinitialiser le formulaire après un ajout réussi
        reset();
        console.log('Données reçues avec succès');
        
      } else {
        const error = await response.json();
        console.error('Erreur lors du traitement des données:', error);
      }
    } catch (error) {
      console.error('Erreur capturée:', error);
    }
    redirect('/dashboard/participants');
  };
  return (
    <Card className='rounded-none bg-violet-50'>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">Ajouter un participant</CardTitle>
        <CardDescription>
          Bienvenue sur l'ajout d'un participant
        </CardDescription>
      </CardHeader>
      
      <CardContent className="grid gap-1">
      <p className="text-lg font-medium leading-10 text-violet-600">Identitée</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4">
            <Label htmlFor="licence">Numéro de licence</Label>
            <Input {...register("licence", { required: false })} id="licence" name="licence" placeholder="entrer le numéro de licence" />
            {errors.licence?.type === 'required' && <Badge variant="destructive" role="alert">Licence is required</Badge>}
            <Label htmlFor="firstname">Nom</Label>
            <Input  {...register("firstname", { required: false })} id="firstname" name="firstname" placeholder="entrer le nom" />
            {errors.firstname?.type === 'required' && <Badge variant="destructive" role="alert">Fisrtname is required</Badge>}
            <Label htmlFor="lastname">Prénom</Label>
            <Input {...register("lastname", { required: false })} id="lastname" name="lastname" placeholder="entrer le prénom" />
            {errors.lastname?.type === 'required' && <Badge variant="destructive" role="alert">Lastname is required</Badge>}
            <Label htmlFor="email">Email</Label>
            <Input {...register("email", { required: false })} type="email" name="email" id="email" placeholder="email pour pouvoir le contacter" />
            {errors.email?.type === 'required' && <Badge variant="destructive" role="alert">Email is required</Badge>}
            <Label htmlFor="pointphase">Point phase</Label>
            <Input {...register("pointphase", { required: false })} type="number" name="pointphase" id="pointphase" placeholder="important les points phase" />
            {errors.pointphase?.type === 'required' && <Badge variant="destructive" role="alert">Point phase is required</Badge>}
            <Label htmlFor="sexe">Important pour l'épreuve féminine</Label>
      <RadioGroup 
        {...register("sexe")} // Pas de validation requise
        defaultValue="Homme" // Valeur par défaut définie sur "Homme"
        className="flex"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Homme" id="HOMME" />
          <Label htmlFor="HOMME">Messieur</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Femme" id="FEMME" />
          <Label htmlFor="FEMME">Dame</Label>
        </div>
      </RadioGroup>

      {/* Affichage du badge si une erreur est présente, mais ici il ne devrait plus apparaître */}
      {errors.sexe && (
        <Badge variant="destructive" role="alert">Genre is required</Badge>
      )}
      
      <p className="text-lg font-medium leading-10 text-violet-600">Epreuves</p>
            <Button type="submit" variant="default">
              <SmilePlus className="mr-2 w-5 h-5" />
              ajouter-le
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
