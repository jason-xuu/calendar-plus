import React from "react";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated background */}
      <BackgroundGradientAnimation>
        {/* Content */}
        <div className="relative min-h-screen flex flex-col items-center justify-center p-6 md:p-8 z-10">
          <div className="text-center mb-8 animate-fade-in max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <CalendarIcon className="h-10 w-10 md:h-12 md:w-12 text-calendar-primary" />
              <h1 className="text-3xl md:text-5xl font-bold text-white">CalendarPlus</h1>
            </div>
            <p className="text-lg md:text-2xl text-white/80 max-w-md mx-auto mb-8">
              Your modern calendar solution for seamless scheduling and event management.
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => navigate("/calendar")}
                size="lg"
                className="bg-calendar-primary hover:bg-calendar-primary/90"
              >
                Get Started
              </Button>
              <Button
                onClick={() => navigate("/login")}
                size="lg"
                className="bg-indigo-500 hover:bg-indigo-600 text-white"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </BackgroundGradientAnimation>
    </div>
  );
};

export default Landing;
