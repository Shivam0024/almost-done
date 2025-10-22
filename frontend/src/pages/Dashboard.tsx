import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Ticket, CreditCard, Clock, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const recentBookings = [
    {
      id: '1',
      from: 'Koyambedu',
      to: 'Airport',
      date: '2025-01-15',
      time: '09:30 AM',
      status: 'Completed',
    },
    {
      id: '2',
      from: 'Chennai Central',
      to: 'Washermanpet',
      date: '2025-01-14',
      time: '05:45 PM',
      status: 'Completed',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
            <p className="text-muted-foreground">Manage your Chennai Metro account and bookings</p>
          </div>

          {/* JWT Token Display */}
          <Card className="mb-8 border-primary/20 bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                JWT Token Information
              </CardTitle>
              <CardDescription>Your current authentication token</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-muted rounded-lg font-mono text-xs break-all">
                {user?.token}
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                This JWT token is used for authenticating with the IDAM system. 
                In production, this would be issued by your Keycloak server.
              </p>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="hover:shadow-metro transition-shadow cursor-pointer" onClick={() => navigate('/book')}>
              <CardHeader>
                <Ticket className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Book Tickets</CardTitle>
                <CardDescription>Book your next journey</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-metro transition-shadow cursor-pointer" onClick={() => navigate('/routes')}>
              <CardHeader>
                <MapPin className="h-8 w-8 text-primary mb-2" />
                <CardTitle>View Routes</CardTitle>
                <CardDescription>Explore metro routes</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-metro transition-shadow cursor-pointer">
              <CardHeader>
                <Clock className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Travel History</CardTitle>
                <CardDescription>View past journeys</CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Recent Bookings */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>Your latest metro journeys</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Ticket className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold">
                          {booking.from} → {booking.to}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {booking.date} • {booking.time}
                        </div>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-green-600">{booking.status}</span>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Bookings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
