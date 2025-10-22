// import { useState } from 'react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Label } from '@/components/ui/label';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Input } from '@/components/ui/input';
// import { Calendar } from '@/components/ui/calendar';
// import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
// import { CalendarIcon, ArrowRight } from 'lucide-react';
// import { format } from 'date-fns';
// import { toast } from 'sonner';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';
// import { useKeycloak } from '@/contexts/KeycloakProvider';
// import { useNavigate } from 'react-router-dom';

// const BookTickets = () => {
//   const [from, setFrom] = useState('');
//   const [to, setTo] = useState('');
//   const [date, setDate] = useState<Date>();
//   const [passengers, setPassengers] = useState('1');
//   const { keycloak, authenticated } = useKeycloak();
//   const navigate = useNavigate();

//   const stations = [
//     'Airport', 'St. Thomas Mount', 'Alandur', 'Guindy', 'Little Mount',
//     'Saidapet', 'Nandanam', 'Teynampet', 'AG-DMS', 'Thousand Lights',
//     'LIC', 'Government Estate', 'Chennai Central', 'High Court', 'Mannadi',
//     'Washermanpet', 'Koyambedu', 'Thirumangalam', 'Anna Nagar Tower',
//     'Anna Nagar East', 'Shenoy Nagar', 'Kilpauk', 'Egmore'
//   ];

//   // API Gateway endpoint
//   const API_GATEWAY_URL = 'https://10.229.40.124:5002/api/bookings';

//   const handleBooking = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!authenticated || !keycloak?.token) {
//       toast.error('Please login to book tickets');
//       keycloak.login({ redirectUri: `${window.location.origin}` });
//       return;
//     }

//     if (!from || !to || !date) {
//       toast.error('Please fill in all fields');
//       return;
//     }

//     try {
//       // Refresh token if near expiry
//       await keycloak.updateToken(5);

//       const response = await fetch(API_GATEWAY_URL, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${keycloak.token}`,
//         },
//         body: JSON.stringify({
//           from,
//           to,
//           date: date.toISOString(),
//           passengers: Number(passengers),
//         }),
//       });

//       if (!response.ok) {
//         const errText = await response.text();
//         throw new Error(`Booking failed: ${errText}`);
//       }

//       const data = await response.json();
//       toast.success(`🎟️ Ticket booked successfully! Booking ID: ${data.bookingId}`);
//     } catch (error: any) {
//       console.error('Booking error:', error);
//       toast.error(`Booking failed: ${error.message}`);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
//       <div className="flex-1 bg-muted/30">
//         <div className="container mx-auto px-4 py-8">
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold mb-2">Book Your Journey</h1>
//             <p className="text-muted-foreground">Plan your trip on Chennai Metro</p>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             <div className="lg:col-span-2">
//               <Card className="shadow-metro">
//                 <CardHeader>
//                   <CardTitle>Journey Details</CardTitle>
//                   <CardDescription>Enter your travel information</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <form onSubmit={handleBooking} className="space-y-6">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div className="space-y-2">
//                         <Label htmlFor="from">From Station</Label>
//                         <Select value={from} onValueChange={setFrom}>
//                           <SelectTrigger id="from">
//                             <SelectValue placeholder="Select departure station" />
//                           </SelectTrigger>
//                           <SelectContent>
//                             {stations.map((station) => (
//                               <SelectItem key={station} value={station}>
//                                 {station}
//                               </SelectItem>
//                             ))}
//                           </SelectContent>
//                         </Select>
//                       </div>

//                       <div className="space-y-2">
//                         <Label htmlFor="to">To Station</Label>
//                         <Select value={to} onValueChange={setTo}>
//                           <SelectTrigger id="to">
//                             <SelectValue placeholder="Select arrival station" />
//                           </SelectTrigger>
//                           <SelectContent>
//                             {stations.map((station) => (
//                               <SelectItem key={station} value={station}>
//                                 {station}
//                               </SelectItem>
//                             ))}
//                           </SelectContent>
//                         </Select>
//                       </div>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div className="space-y-2">
//                         <Label>Travel Date</Label>
//                         <Popover>
//                           <PopoverTrigger asChild>
//                             <Button
//                               variant="outline"
//                               className="w-full justify-start text-left font-normal"
//                             >
//                               <CalendarIcon className="mr-2 h-4 w-4" />
//                               {date ? format(date, 'PPP') : 'Pick a date'}
//                             </Button>
//                           </PopoverTrigger>
//                           <PopoverContent className="w-auto p-0" align="start">
//                             <Calendar
//                               mode="single"
//                               selected={date}
//                               onSelect={setDate}
//                               disabled={(date) => date < new Date()}
//                               initialFocus
//                             />
//                           </PopoverContent>
//                         </Popover>
//                       </div>

//                       <div className="space-y-2">
//                         <Label htmlFor="passengers">Number of Passengers</Label>
//                         <Input
//                           id="passengers"
//                           type="number"
//                           min="1"
//                           max="10"
//                           value={passengers}
//                           onChange={(e) => setPassengers(e.target.value)}
//                         />
//                       </div>
//                     </div>

//                     <Button type="submit" className="w-full" size="lg">
//                       Book Tickets
//                       <ArrowRight className="ml-2 h-4 w-4" />
//                     </Button>
//                   </form>
//                 </CardContent>
//               </Card>
//             </div>

//             <div>
//               <Card className="shadow-metro">
//                 <CardHeader>
//                   <CardTitle>Quick Info</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div className="p-4 bg-muted rounded-lg">
//                     <h4 className="font-semibold mb-2">Operating Hours</h4>
//                     <p className="text-sm text-muted-foreground">
//                       6:00 AM - 10:00 PM (Daily)
//                     </p>
//                   </div>

//                   <div className="p-4 bg-muted rounded-lg">
//                     <h4 className="font-semibold mb-2">Frequency</h4>
//                     <p className="text-sm text-muted-foreground">
//                       Trains every 5-7 minutes
//                     </p>
//                   </div>

//                   <div className="p-4 bg-muted rounded-lg">
//                     <h4 className="font-semibold mb-2">Payment Methods</h4>
//                     <p className="text-sm text-muted-foreground">
//                       Cash, Cards, UPI, Metro Card
//                     </p>
//                   </div>

//                   <div className="p-4 bg-gradient-hero text-white rounded-lg">
//                     <h4 className="font-semibold mb-2">First Time User?</h4>
//                     <p className="text-sm text-white/90 mb-3">
//                       Get 10% off on your first booking
//                     </p>
//                     <Button variant="secondary" size="sm" className="w-full">
//                       Learn More
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default BookTickets;




import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useKeycloak } from '@/contexts/KeycloakProvider';
import { useNavigate } from 'react-router-dom';

// ✅ Import DPoP utilities
import { initDPoP, createDPoPProof } from '@/utils/dpop';

const BookTickets = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState<Date>();
  const [passengers, setPassengers] = useState('1');
  const { keycloak, authenticated } = useKeycloak();
  const navigate = useNavigate();

  const stations = [
    'Airport', 'St. Thomas Mount', 'Alandur', 'Guindy', 'Little Mount',
    'Saidapet', 'Nandanam', 'Teynampet', 'AG-DMS', 'Thousand Lights',
    'LIC', 'Government Estate', 'Chennai Central', 'High Court', 'Mannadi',
    'Washermanpet', 'Koyambedu', 'Thirumangalam', 'Anna Nagar Tower',
    'Anna Nagar East', 'Shenoy Nagar', 'Kilpauk', 'Egmore'
  ];

  const API_GATEWAY_URL = 'https://10.229.40.124:5002/api/bookings';

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!authenticated || !keycloak?.token) {
      toast.error('Please login to book tickets');
      keycloak.login({ redirectUri: `${window.location.origin}` });
      return;
    }

    if (!from || !to || !date) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      // 🔹 Ensure DPoP keypair is initialized
      await initDPoP();

      // 🔹 Refresh Keycloak token if near expiry
      await keycloak.updateToken(5);

      // 🔹 Create DPoP proof for this booking API call
      const dpop = await createDPoPProof('POST', API_GATEWAY_URL);

      // 🔹 Make secure booking API call
      const response = await fetch(API_GATEWAY_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${keycloak.token}`,
          DPoP: dpop,
        },
        body: JSON.stringify({
          from,
          to,
          date: date.toISOString(),
          passengers: Number(passengers),
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Booking failed: ${errText}`);
      }

      const data = await response.json();
      toast.success(`🎟️ Ticket booked successfully for ${from} → ${to}`);
    } catch (error: any) {
      console.error('❌ Booking error:', error);
      toast.error(`Booking failed: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Book Your Journey</h1>
            <p className="text-muted-foreground">Plan your trip on Chennai Metro</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="shadow-metro">
                <CardHeader>
                  <CardTitle>Journey Details</CardTitle>
                  <CardDescription>Enter your travel information</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleBooking} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="from">From Station</Label>
                        <Select value={from} onValueChange={setFrom}>
                          <SelectTrigger id="from">
                            <SelectValue placeholder="Select departure station" />
                          </SelectTrigger>
                          <SelectContent>
                            {stations.map((station) => (
                              <SelectItem key={station} value={station}>
                                {station}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="to">To Station</Label>
                        <Select value={to} onValueChange={setTo}>
                          <SelectTrigger id="to">
                            <SelectValue placeholder="Select arrival station" />
                          </SelectTrigger>
                          <SelectContent>
                            {stations.map((station) => (
                              <SelectItem key={station} value={station}>
                                {station}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Travel Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {date ? format(date, 'PPP') : 'Pick a date'}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="passengers">Number of Passengers</Label>
                        <Input
                          id="passengers"
                          type="number"
                          min="1"
                          max="10"
                          value={passengers}
                          onChange={(e) => setPassengers(e.target.value)}
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full" size="lg">
                      Book Tickets
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="shadow-metro">
                <CardHeader>
                  <CardTitle>Quick Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold mb-2">Operating Hours</h4>
                    <p className="text-sm text-muted-foreground">
                      6:00 AM - 10:00 PM (Daily)
                    </p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold mb-2">Frequency</h4>
                    <p className="text-sm text-muted-foreground">
                      Trains every 5-7 minutes
                    </p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold mb-2">Payment Methods</h4>
                    <p className="text-sm text-muted-foreground">
                      Cash, Cards, UPI, Metro Card
                    </p>
                  </div>

                  <div className="p-4 bg-gradient-hero text-white rounded-lg">
                    <h4 className="font-semibold mb-2">First Time User?</h4>
                    <p className="text-sm text-white/90 mb-3">
                      Get 10% off on your first booking
                    </p>
                    <Button variant="secondary" size="sm" className="w-full">
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookTickets;
