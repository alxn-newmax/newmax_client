import { Link } from 'react-router-dom';

import { clsx } from 'clsx';

interface Props {
  data: {
    link: string;
    icon: string;
    label: string;
    permissionGranted: (() => boolean) | boolean;
  };
  key: number;
}

export default function SidebarItem({ data, key }: Props) {
  const navLinkClass = clsx({
    'nav-link': true,
    'nav-active': false,
  });

  return (
    <li className={navLinkClass} key={`nav-${key}`}>
      <Link to={data.link}>
        <span className="nav-label">{data.label}</span>
      </Link>
    </li>
  );
}
