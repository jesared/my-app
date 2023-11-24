'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from "next-auth/react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Props {
    title: string;
    description?: string;
    isLoading?: boolean;
}


export function SignInForm({ title, description, isLoading}: Props) {

    
    // const [formData, setFormData] = useState({ email: '', password: ''});
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("")

    const router = useRouter();

    const handleSubmit = async (e: any) => {
        
        e.preventDefault();

        if (!email || !password) {
            setError("All fields are necessary.");
            return;
        }
        try {
            const res = await signIn('credentials', {
                email, 
                password, 
                redirect: false,
            });
            if ((res as { error?: string }).error) {
                setError("Invalid Credentials");
                return;
            }
            
            router.replace("dashboard");

        } catch (error) {
            console.log(error)
        }
    };

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>
            <CardContent>
                <div>
                    <form onSubmit={handleSubmit} className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input type="email" id="email" name="email" placeholder="email@email.com" onChange={(e: any) => setEmail(e.target.value)} />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="password">Mot de passe</Label>
                            <Input type="password" id="password" name="password" placeholder="password" onChange={(e: any) => setPassword(e.target.value)} />
                        </div>

                        <div className="">

                            {/* Utilisez isLoading pour désactiver le bouton pendant le chargement */}
                            <Button className='w-full' type="submit" disabled={isLoading}>
                                {/* Affichez 'Chargement...' lors du chargement, sinon 'S'inscrire' ou 'Se connecter' */}
                                {isLoading ? 'Chargement...' : 'Se connecter'}
                            </Button>
                            {error && (
                                <div className='bg-red-500 text-white w-fit text-xs py-1 px-3 rounded-md mt-2'>
                                    {error}
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            </CardContent>
        </Card>
    );
}

