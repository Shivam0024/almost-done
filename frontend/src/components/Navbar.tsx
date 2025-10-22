


// import { Link, useNavigate } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
// import { Train, User, LogOut, Menu } from 'lucide-react';
// import { useAuth } from '@/contexts/AuthContext';
// import keycloak from '@/keycloak'; // ✅ Import your Keycloak instance
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

// const Navbar = () => {
//   const { user, logout, isAuthenticated } = useAuth();
//   const navigate = useNavigate();

//   const navLinks = [
//     { to: '/', label: 'Home' },
//     { to: '/routes', label: 'Routes & Fares' },
//     { to: '/book', label: 'Book Tickets' },
//     { to: '/services', label: 'Services' },
//   ];

//   return (
//     <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="container mx-auto px-4">
//         <div className="flex h-16 items-center justify-between">
//           {/* Logo */}
//           <Link to="/" className="flex items-center gap-2">
//             <div className="rounded-full bg-gradient-hero p-2">
//               <Train className="h-6 w-6 text-primary-foreground" />
//             </div>
//             <span className="text-xl font-bold text-foreground">Chennai Metro</span>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center gap-6">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.to}
//                 to={link.to}
//                 className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
//               >
//                 {link.label}
//               </Link>
//             ))}
//           </div>

//           {/* Desktop Auth */}
//           <div className="hidden md:flex items-center gap-3">
//             {isAuthenticated ? (
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button variant="ghost" size="sm" className="gap-2">
//                     <User className="h-4 w-4" />
//                     {user?.name}
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end">
//                   <DropdownMenuItem onClick={() => navigate('/dashboard')}>
//                     Dashboard
//                   </DropdownMenuItem>
//                   <DropdownMenuItem onClick={logout}>
//                     <LogOut className="mr-2 h-4 w-4" />
//                     Logout
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             ) : (
//               <>
//                 {/* ✅ Direct Keycloak login */}
//                 <Button onClick={() => keycloak.login()} variant="ghost" size="sm">
//                   Login
//                 </Button>

//                 {/* ✅ Direct Keycloak register */}
//                 <Button onClick={() => keycloak.register()} size="sm">
//                   Register
//                 </Button>
//               </>
//             )}
//           </div>

//           {/* Mobile Navigation */}
//           <Sheet>
//             <SheetTrigger asChild className="md:hidden">
//               <Button variant="ghost" size="icon">
//                 <Menu className="h-5 w-5" />
//               </Button>
//             </SheetTrigger>
//             <SheetContent>
//               <div className="flex flex-col gap-4 mt-8">
//                 {navLinks.map((link) => (
//                   <Link
//                     key={link.to}
//                     to={link.to}
//                     className="text-lg font-medium text-foreground/80 transition-colors hover:text-primary"
//                   >
//                     {link.label}
//                   </Link>
//                 ))}

//                 {isAuthenticated ? (
//                   <>
//                     <Button
//                       onClick={() => navigate('/dashboard')}
//                       variant="outline"
//                       className="w-full"
//                     >
//                       Dashboard
//                     </Button>
//                     <Button onClick={logout} variant="outline" className="w-full">
//                       Logout
//                     </Button>
//                   </>
//                 ) : (
//                   <>
//                     {/* ✅ Mobile Keycloak login/register */}
//                     <Button
//                       onClick={() => keycloak.login()}
//                       variant="outline"
//                       className="w-full"
//                     >
//                       Login
//                     </Button>
//                     <Button
//                       onClick={() => keycloak.register()}
//                       className="w-full"
//                     >
//                       Register
//                     </Button>
//                   </>
//                 )}
//               </div>
//             </SheetContent>
//           </Sheet>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



// src/components/Navbar.tsx
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Train, User, LogOut, Menu } from 'lucide-react';
import { useKeycloak } from '../contexts/KeycloakProvider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Navbar = () => {
  const { keycloak, authenticated } = useKeycloak();
  const navigate = useNavigate();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/routes', label: 'Routes & Fares' },
    { to: '/book', label: 'Book Tickets' },
    { to: '/services', label: 'Services' },
  ];

  const username =
    keycloak?.tokenParsed?.preferred_username ||
    keycloak?.tokenParsed?.email ||
    'User';

  const handleLogin = () => {
    keycloak.login({ redirectUri: `${window.location.origin}/dashboard` });
  };

  const handleRegister = () => {
    keycloak.register({ redirectUri: `${window.location.origin}/dashboard` });
  };

  const handleLogout = () => {
    keycloak.logout({ redirectUri: `${window.location.origin}/` });
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="rounded-full bg-gradient-hero p-2">
              <Train className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Chennai Metro</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3">
            {authenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                    {username}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button onClick={handleLogin} variant="ghost" size="sm">
                  Login
                </Button>
                <Button onClick={handleRegister} size="sm">
                  Register
                </Button>
              </>
            )}
          </div>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="text-lg font-medium text-foreground/80 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                ))}

                {authenticated ? (
                  <>
                    <Button
                      onClick={() => navigate('/dashboard')}
                      variant="outline"
                      className="w-full"
                    >
                      Dashboard
                    </Button>
                    <Button onClick={handleLogout} variant="outline" className="w-full">
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={handleLogin}
                      variant="outline"
                      className="w-full"
                    >
                      Login
                    </Button>
                    <Button
                      onClick={handleRegister}
                      className="w-full"
                    >
                      Register
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
