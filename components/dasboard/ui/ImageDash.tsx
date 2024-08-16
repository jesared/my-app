import Image from "next/image";

interface ImageDashProps {
    userName?: string;
    avatarLink?: string;
  }

export function ImageDash({
    userName = 'Profile Name',
    avatarLink = '/assets/images/ping.jpg',
 }: ImageDashProps){
    return(
        <div className="py-6 flex flex-col items-center">
            <div className="relative h-24 w-24 mb-2 box-content border-4 rounded-full overflow-hidden p-0  border-indigo-500/100">
                <Image
                        src={avatarLink}               
                        alt="Picture of the author"
                        fill // Important pour remplir tout le conteneur
                        priority={true} // {false} | {true}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{ objectFit: 'cover' }} // S'assure que l'image est bien centrée et recadrée
                />           
            </div>
            <h5 className="text-xs">{userName}</h5>
        </div>
    )

}