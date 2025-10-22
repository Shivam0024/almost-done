import { Train, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="rounded-full bg-gradient-hero p-2">
                <Train className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">Chennai Metro</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your reliable partner for safe and efficient urban transportation in Chennai.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/routes" className="text-muted-foreground hover:text-primary transition-colors">
                  Routes & Fares
                </Link>
              </li>
              <li>
                <Link to="/book" className="text-muted-foreground hover:text-primary transition-colors">
                  Book Tickets
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">
                  Services
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Help & Support</li>
              <li>Lost & Found</li>
              <li>Feedback</li>
              <li>FAQs</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>1800-425-1234</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>info@chennaimetro.com</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Chennai, Tamil Nadu</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2025 Chennai Metro Rail Limited. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
