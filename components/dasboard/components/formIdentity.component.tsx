/* eslint-disable react/no-unescaped-entities */
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useForm } from "react-hook-form";

export function FormIndentity(){


    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm();


    return(
        <>
        {/* formulaire identité à prévoir ici */}
        </>
    )
}