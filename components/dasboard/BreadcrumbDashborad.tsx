import Link from 'next/link';
import React from 'react';

interface Breadcrumb {
    label: string;
    href: string;
  }
  


interface BreadcrumbProps {
  breadcrumbs: Breadcrumb[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ breadcrumbs }) => {
  return (
    <nav aria-label="breadcrumb ">
      <ul className="breadcrumb ml-8 my-6">
        {breadcrumbs.map((crumb, index) => (
          <li key={index} className="breadcrumb-item inline-block">
            {index === breadcrumbs.length - 1 ? (
              <span className='text-white'>{crumb.label}</span>
            ) : (
              <Link className='font-bold text-gray-200' href={crumb.href}>{crumb.label}<span className='px-2 text-lg font-black text-gray-200'><b>/</b></span></Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumb;