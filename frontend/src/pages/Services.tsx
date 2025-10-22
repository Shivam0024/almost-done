import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wifi, Smartphone, ShoppingBag, Accessibility, Camera, Heart } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Services = () => {
  const services = [
    {
      icon: Wifi,
      title: 'Free WiFi',
      description: 'Stay connected with complimentary high-speed internet at all stations',
    },
    {
      icon: Smartphone,
      title: 'Mobile App',
      description: 'Download our app for easy ticket booking and real-time updates',
    },
    {
      icon: ShoppingBag,
      title: 'Station Amenities',
      description: 'Shopping, dining, and retail outlets at major stations',
    },
    {
      icon: Accessibility,
      title: 'Accessibility',
      description: 'Wheelchair access, elevators, and facilities for differently-abled',
    },
    {
      icon: Camera,
      title: 'Security',
      description: '24/7 CCTV surveillance and security personnel for your safety',
    },
    {
      icon: Heart,
      title: 'Customer Care',
      description: 'Dedicated helpdesk and customer support at all stations',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Our Services</h1>
            <p className="text-muted-foreground">
              Discover the facilities and amenities available at Chennai Metro
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {services.map((service, index) => (
              <Card key={index} className="shadow-metro hover:-translate-y-1 transition-all">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-hero flex items-center justify-center mb-4">
                    <service.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-metro">
              <CardHeader>
                <CardTitle>Lost & Found</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-muted-foreground">
                <p>Lost something on the metro? Contact our Lost & Found department:</p>
                <p className="font-semibold text-foreground">Phone: 1800-425-1234</p>
                <p className="font-semibold text-foreground">Email: lostandfound@chennaimetro.com</p>
                <p className="text-sm">Available: 8:00 AM - 8:00 PM (All days)</p>
              </CardContent>
            </Card>

            <Card className="shadow-metro">
              <CardHeader>
                <CardTitle>Feedback & Suggestions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-muted-foreground">
                <p>We value your feedback. Help us improve our services:</p>
                <p className="font-semibold text-foreground">Email: feedback@chennaimetro.com</p>
                <p className="font-semibold text-foreground">SMS: Send 'FEEDBACK' to 56677</p>
                <p className="text-sm">We respond within 48 hours</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Services;
