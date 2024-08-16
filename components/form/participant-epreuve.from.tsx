/* eslint-disable react-hooks/exhaustive-deps */
// components/ParticipantEpreuvesForm.tsx

import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { EpreuveModel } from '@/app/models/epreuves.model';
import { ParticipantDocument } from '@/app/models/participants.model';
import { format, isValid } from 'date-fns';
import mongoose from 'mongoose';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface EpreuveModelWithChecked extends EpreuveModel {
    idEpreuve: mongoose.Types.ObjectId;
    selected: boolean;
    _id: mongoose.Types.ObjectId;
}


interface FormData {
    epreuveNames: { [id: string]: string; };
    selectedEpreuves: { [id: string]: boolean };
    name: string;
    id: string;
    date: Date;
}

interface ParticipantEpreuveFormProps {
    participant: ParticipantDocument;
}

const ParticipantEpreuveForm: React.FC<ParticipantEpreuveFormProps> = ({ participant }) => {
    const { register, handleSubmit, setValue } = useForm<FormData>();
    const [epreuves, setEpreuves] = useState<EpreuveModelWithChecked[]>([]);
    const router = useRouter();

    useEffect(() => {
        fetch('/api/epreuves')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Erreur lors de la récupération des épreuves: ${response.status} - ${response.statusText}`);
                }
                return response.json();
            })
            .then((data) => {

                if (data.epreuves) {
                    const epreuvesWithChecked = data.epreuves.map((epreuve: EpreuveModel) => ({
                        ...epreuve,
                        name: epreuve.name,
                        idEpreuve: new mongoose.Types.ObjectId(epreuve._id), // Assurez-vous que _id est une chaîne valide pour ObjectId
                        selected: participant.selectedEpreuves.some((selectedEpreuve) => selectedEpreuve.idEpreuve === epreuve._id.toString() && selectedEpreuve.selected),
                    }));

                    setEpreuves(epreuvesWithChecked);
                    const selectedEpreuves = Object.fromEntries(
                        epreuvesWithChecked.map((epreuve: { _id: any; selected: any; name: string }) => [epreuve._id, epreuve.selected, epreuve.name])
                    );
                    setValue('selectedEpreuves', selectedEpreuves);
                }
            })
            .catch((error) => console.error('Erreur lors de la récupération des épreuves:', error));
    }, [participant, setValue]);

    const handleCheckboxChange = (epreuveId: mongoose.Types.ObjectId, isChecked: boolean, name: string) => {

        setEpreuves((prevEpreuves: EpreuveModelWithChecked[]) => {
            const updatedEpreuves = prevEpreuves.map((epreuve) => {
                if (epreuve.idEpreuve.equals(epreuveId)) {
                    return {
                        ...epreuve,
                        selected: isChecked,
                    };
                }
                return epreuve;
            });

            const selectedEpreuves: { [id: string]: boolean } = {};
            updatedEpreuves.forEach((epreuve) => {
                selectedEpreuves[epreuve.idEpreuve.toString()] = epreuve.selected;

            });

            setValue('selectedEpreuves', selectedEpreuves);

            return updatedEpreuves;
        });
    };

    // Soumettez les données du formulaire à votre API
    const onSubmit: SubmitHandler<FormData> = async (data) => {
        data.id = participant._id as string;


        // Récupérez les noms des épreuves à partir de selectedEpreuves
        const epreuveNames: { [id: string]: string } = {};
        epreuves.forEach((epreuve) => {
            epreuveNames[epreuve.idEpreuve.toString()] = epreuve.name;
        });

        // Ajoutez les noms des épreuves à l'objet data
        data.epreuveNames = epreuveNames;

        try {
            // Faites une requête pour enregistrer les épreuves sélectionnées depuis votre API
            const response = await fetch(`/api/participants/${participant._id}/epreuves`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

         
              
            if (response.ok) {

                toast('Epreuves enregistrées avec succès.', {type:'success', delay: 800 });
                console.log('Epreuves enregistrées avec succès.', response);

                // Redirigez l'utilisateur ou faites toute autre action nécessaire
                router.push('/dashboard/participants');
            } else {
                const errorText = await response.text();
                console.error('Erreur lors de l\'enregistrement des épreuves:', errorText);
            }
        } catch (error) {
            console.error('Erreur lors de l\'enregistrement des épreuves:', error);
        }
    };

    // Fonction pour regrouper les épreuves par date
    const groupEpreuvesByDate = () => {
        const groupedEpreuves: { [date: string]: EpreuveModel[] } = {};

        epreuves.forEach((epreuve) => {
            if (isValid(new Date(epreuve.date))) {
                const formattedDate = format(new Date(epreuve.date), 'dd/MM');

                if (!groupedEpreuves[formattedDate]) {
                    groupedEpreuves[formattedDate] = [];
                }

                groupedEpreuves[formattedDate].push(epreuve);
            } else {
                console.log('Invalid date:', epreuve.date);
            }
        });

        return groupedEpreuves;
    };

    const groupedEpreuves = groupEpreuvesByDate();



    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='grid grid-cols-3 gap-2 mt-2'>
                {Object.entries(groupedEpreuves).map(([date, epreuves]) => (
                    <Card key={date} className="mb-4">
                        <CardHeader>
                            <CardTitle>{`Épreuves du ${date}`}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {epreuves.map((epreuve) => (
                                <div key={`epreuve-${epreuve._id}`} className="flex items-center mb-2">
                                    <input
                                        type='checkbox'
                                        {...register(`selectedEpreuves.${epreuve._id}` as const)}
                                        id={`checkbox-${epreuve._id}`}
                                        checked={epreuve.selected} // Utilisez la propriété selected de l'objet epreuve
                                        onChange={(e) => handleCheckboxChange(epreuve._id, e.target.checked, epreuve.name)}
                                    />
                                    <Label className="pl-4 text-slate-500" htmlFor={`checkbox-${epreuve._id}`}>
                                        {`${epreuve.name} - ${epreuve.detail}`}
                                    </Label>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                ))}
            </div>
            <Button type="submit">Enregistrer</Button>
        </form>
    );
};

export default ParticipantEpreuveForm;
