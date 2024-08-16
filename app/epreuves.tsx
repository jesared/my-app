//app/epreuves

interface Props {
    _id: Key | null | undefined;
    id: string;
    name: string;
    date: string;
    heure: string;
    detail: string;
    tarif: number | "Gratuit"
}

export const TableauxEngagementList: Props[] =
    [
        {
            id: "C",
            name: "C",
            date: "08/04",
            heure: "11h",
            detail: "800 à 1399 pts",
            tarif: 8,
        },
        {
            id: "A",
            name: "A",
            date: "08/04",
            heure: "12h",
            detail: "500 à 799 pts",
            tarif: 8,
        },
        {
            id: "D",
            name: "D",
            date: "08/04",
            heure: "13h",
            detail: "1100 à 1699 pts",
            tarif: 8,
        },
        {
            id: "B",
            name: "B",
            date: "08/04",
            heure: "14h",
            detail: "500 à 1099 pts",
            tarif: 8,
        },
        {
            id: "F",
            name: "F",
            date: "09/04",
            heure: "8h30",
            detail: "500 à 1199 pts",
            tarif: 8,
        },
        {
            id: "H",
            name: "H",
            date: "09/04",
            heure: "9h30",
            detail: "1200 à 1799 pts",
            tarif: 8,
        },
        {
            id: "E",
            name: "E",
            date: "09/04",
            heure: "11h",
            detail: "500 à 899 pts",
            tarif: 8,
        },
        {
            id: "G",
            name: "G",
            date: "09/04",
            heure: "12h",
            detail: "900 à 1499 pts",
            tarif: 8,
        },
        {
            id: "I",
            name: "I",
            date: "09/04",
            heure: "13h15",
            detail: "500 à n°400",
            tarif: 8,
        },
        {
            id: "J",
            name: "J",
            date: "09/04",
            heure: "14h30",
            detail: "Dames TC",
            tarif: "Gratuit",
        },
        {
            id: "L",
            name: "L",
            date: "10/04",
            heure: "8h30",
            detail: "500 à 1299 pts",
            tarif: 8,
        },
        {
            id: "N",
            name: "N",
            date: "10/04",
            heure: "9h30",
            detail: "1300 à 2099 pts",
            tarif: 8,
        },
        {
            id: "K",
            name: "K",
            date: "10/04",
            heure: "11h",
            detail: "500 à 999 pts",
            tarif: 8,
        },
        {
            id: "M",
            name: "M",
            date: "10/04",
            heure: "12h",
            detail: "1000 à 1599 pts",
            tarif: 8,
        },
        {
            id: "P",
            name: "P",
            date: "10/04",
            heure: "13h15",
            detail: "TC",
            tarif: 10,
        },
    ]
   

