import Link from 'next/link';

export default ({ currentUser }) => {
  const links = (currentUser)? [
    { href: '/', label: `${currentUser.email.split('@')[0]}` },
    { href: '/auth/logout', label: 'logout' },
  ]: [
    { href: '/auth/login', label: 'login' },
    { href: '/auth/signup', label: 'register' },
  ];
  
  return (
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <Link href="/">
            <a className="navbar-brand">Tickets</a>
          </Link>
        </div>
        <ul className="nav d-flex align-items-center">
          {
            links.map(link => (
              <li key={link.href}>
                <Link href={link.href}>
                  <a className="nav-link">{link.label}</a>
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
    </nav>
  );
};