import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export function ContactInfo() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Get in Touch</h2>
      <p className="text-muted-foreground">
        Have questions or need assistance? We&apos;re here to help. Contact our friendly team using any of the methods below.
      </p>
      
      <div className="space-y-4 mt-6">
        <div className="flex items-start">
          <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5" />
          <div>
            <h3 className="font-medium">Our Office</h3>
            <p className="text-muted-foreground">
              123 Workspace Avenue<br />
              Tech District, San Francisco<br />
              CA 94107, USA
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Phone className="h-5 w-5 text-primary mr-3 mt-0.5" />
          <div>
            <h3 className="font-medium">Phone</h3>
            <p className="text-muted-foreground">
              +1 (555) 123-4567
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Mail className="h-5 w-5 text-primary mr-3 mt-0.5" />
          <div>
            <h3 className="font-medium">Email</h3>
            <p className="text-muted-foreground">
              contact@juanwork.com
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Clock className="h-5 w-5 text-primary mr-3 mt-0.5" />
          <div>
            <h3 className="font-medium">Business Hours</h3>
            <p className="text-muted-foreground">
              Monday - Friday: 9:00 AM - 6:00 PM<br />
              Saturday: 10:00 AM - 4:00 PM<br />
              Sunday: Closed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
