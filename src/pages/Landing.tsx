import React from "react";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Background animation */}
      <BackgroundGradientAnimation>
        {/* Content inside animation */}
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
          <div className="text-center mb-8 animate-fade-in max-w-xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <CalendarIcon className="h-12 w-12 text-white" />
              <h1 className="text-4xl font-bold text-white">CalendarPlus</h1>
            </div>
            <p className="text-xl text-white/80 max-w-md mx-auto mb-8">
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
                variant="outline"
                size="lg"
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
