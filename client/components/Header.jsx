import Link from 'next/link';

export default ({ currentUser }) => {
  const links = (currentUser)? [
    { href: '/logout', label: 'logout' },
  ]: [
    { href: '/login', label: 'login' },
    { href: '/register', label: 'register' },
  ];
  
  return (
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <Link href="/">
            <a class="navbar-brand">WebSiteName</a>
          </Link>
        </div>
        <ul class="nav navbar-nav">
          { 
            links.map(link => (
              <li key={link.href}>
                <Link href={link.href}>
                  <a class="nav-link">{link.label}</a>
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
    </nav>
  );
};