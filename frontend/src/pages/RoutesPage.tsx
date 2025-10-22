import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Routes = () => {
  const routes = [
    {
      line: 'Blue Line',
      stations: ['Washermanpet', 'Mannadi', 'High Court', 'Chennai Central', 'Government Estate', 'LIC', 'Thousand Lights', 'AG-DMS', 'Teynampet', 'Nandanam', 'Saidapet', 'Little Mount', 'Guindy', 'Alandur', 'St. Thomas Mount', 'Airport'],
      color: 'bg-blue-600',
    },
    {
      line: 'Green Line',
      stations: ['Wimco Nagar', 'Tiruvottriyur', 'Wimco Nagar Depot', 'Kaladipet', 'Tollgate', 'New Washermanpet', 'Tondiarpet', 'Sir Theagaroya College', 'Washermanpet', 'Korukkupet', 'Puratchi Thalaivar Dr. MGR Central', 'Chennai Central', 'Egmore', 'Nehru Park', 'Kilpauk', 'Pachaiyappa\'s College', 'Shenoy Nagar', 'Anna Nagar East', 'Anna Nagar Tower', 'Thirumangalam', 'Koyambedu'],
      color: 'bg-green-600',
    },
  ];

  const fares = [
    { distance: '0-2 km', fare: '₹10' },
    { distance: '2-5 km', fare: '₹20' },
    { distance: '5-10 km', fare: '₹30' },
    { distance: '10-20 km', fare: '₹40' },
    { distance: '20+ km', fare: '₹50' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Routes & Fares</h1>
            <p className="text-muted-foreground">Explore Chennai Metro routes and fare information</p>
          </div>

          {/* Routes */}
          <div className="space-y-6 mb-12">
            {routes.map((route, index) => (
              <Card key={index} className="shadow-metro">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${route.color}`}></div>
                    <CardTitle>{route.line}</CardTitle>
                    <Badge variant="secondary">{route.stations.length} Stations</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {route.stations.map((station, idx) => (
                      <Badge key={idx} variant="outline">
                        {station}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Fares */}
          <Card className="shadow-metro">
            <CardHeader>
              <CardTitle>Fare Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold">Distance</th>
                      <th className="text-left py-3 px-4 font-semibold">Fare</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fares.map((fare, index) => (
                      <tr key={index} className="border-b border-border/50">
                        <td className="py-3 px-4">{fare.distance}</td>
                        <td className="py-3 px-4 font-semibold text-primary">{fare.fare}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> Fares are subject to change. Children below 3 years travel free. 
                  Senior citizens and differently-abled persons enjoy special concessions.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Routes;
