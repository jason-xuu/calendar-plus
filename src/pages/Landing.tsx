import React from 'react';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-10 dark:opacity-5"></div>
      
      {/* Content */}
      <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center mb-8 animate-fade-in max-w-xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <CalendarIcon className="h-12 w-12 text-calendar-primary" />
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white">CalendarPlus</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-md mx-auto mb-8">
            Your modern calendar solution for seamless scheduling and event management
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => navigate("/calendar")}
              size="lg"
              className="bg-calendar-primary hover:bg-calendar-primary/90"
            >
              Get Started
            </Button>
            <Button onClick={() => navigate("/login")} variant="outline" size="lg">
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
