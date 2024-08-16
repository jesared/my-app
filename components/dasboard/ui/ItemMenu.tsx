import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserPlus, HandMetal, Settings, Home, User as UserIcon, LucideIcon } from 'lucide-react';


interface IconMap {
    [key: string]: LucideIcon;
  }

const iconMap: IconMap = {
  user: UserIcon,
  add: UserPlus,
  participant: HandMetal,
  settings: Settings,
  home: Home,
};

interface ItemMenuProps {
  label?: string;
  icon?: keyof IconMap;
  href?: string;
  onClick?: () => void;
}

export function ItemMenu({ label = '', icon = '', href = '/dashboard', onClick }: ItemMenuProps) {
  const pathname = usePathname();
  const IconComponent = iconMap[icon];

  return (
    <div className="p-4 hover:bg-white rounded">
      <Link href={href} onClick={onClick} passHref>
        <div className={`flex items-center ${pathname === href ? 'text-primary' : ''}`}>
          {IconComponent && <IconComponent className="mr-2 h-5 w-5" />}
          <span>{label}</span>
        </div>
      </Link>
    </div>
  );
}