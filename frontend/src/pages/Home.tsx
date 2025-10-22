import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, Map, Clock, Shield, Ticket, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import heroMetro from '@/assets/hero-metro.jpg';

const Home = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: Ticket,
      title: 'Easy Booking',
      description: 'Book tickets online and skip the queue',
    },
    {
      icon: Map,
      title: 'Route Planning',
      description: 'Find the fastest route to your destination',
    },
    {
      icon: Clock,
      title: 'Real-time Updates',
      description: 'Track your metro in real-time',
    },
    {
      icon: CreditCard,
      title: 'Digital Payments',
      description: 'Multiple payment options available',
    },
    {
      icon: Shield,
      title: 'Safe Travel',
      description: 'Your safety is our priority',
    },
    {
      icon: Users,
      title: '24/7 Support',
      description: 'We are here to help you anytime',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
        <img 
          src={heroMetro} 
          alt="Chennai Metro" 
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
        />
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Welcome to Chennai Metro
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
            Experience fast, safe, and comfortable urban transportation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/book')}
              className="bg-white text-primary hover:bg-white/90 shadow-metro"
            >
              Book Tickets Now
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/routes')}
              className="border-white text-white hover:bg-white hover:text-primary"
            >
              View Routes
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover the features that make Chennai Metro your preferred choice for travel
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className="transition-all hover:shadow-metro hover:-translate-y-1 bg-gradient-card border-border/50"
              >
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
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '54 km', label: 'Network Length' },
              { value: '32', label: 'Metro Stations' },
              { value: '4L+', label: 'Daily Riders' },
              { value: '99%', label: 'On-time Performance' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Join millions of satisfied passengers who choose Chennai Metro every day
          </p>
          <Button 
            size="lg"
            onClick={() => navigate('/login')}
            className="bg-white text-primary hover:bg-white/90 shadow-lg"
          >
            Get Started
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
