import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  Stethoscope, 
  Zap, 
  Shield, 
  Clock, 
  Users, 
  ChevronRight, 
  CheckCircle,
  AlertTriangle,
  Sparkles,
  Eye,
  Brain,
  Heart
} from 'lucide-react';
import Header from '@/components/Header';
import AuthModal from '@/components/AuthModal';
import SkinAnalyzer from '@/components/SkinAnalyzer';
import { useAuthStore } from '@/store/auth-store';

export default function HomePage() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { isAuthenticated, checkAuthStatus } = useAuthStore();

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const features = [
    {
      icon: <Brain className="h-5 w-5" />,
      title: 'AI-Powered Analysis',
      description: 'Advanced machine learning models trained on thousands of dermatological cases'
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: 'Instant Results',
      description: 'Get preliminary skin condition insights in under 30 seconds'
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: 'Privacy First',
      description: 'Your images are processed securely and not stored permanently'
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: 'Student Focused',
      description: 'Designed specifically for the busy lifestyle of Kota students'
    }
  ];

  const conditions = [
    'Acne Vulgaris',
    'Contact Dermatitis', 
    'Fungal Infections',
    'Eczema & Rashes',
    'Skin Allergies',
    'Normal Skin Assessment'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/30 to-white">
      <Header onAuthClick={() => setShowAuthModal(true)} />
      
      <main className="container mx-auto px-4 py-8 space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-6 py-12">
          <div className="space-y-4">
            <Badge variant="outline" className="px-4 py-2 text-sm border-primary/30 text-primary">
              <Sparkles className="h-4 w-4 mr-2" />
              AI-Powered Healthcare for Students
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              Smart Skin Health
              <span className="text-primary block">Screening</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Get instant, AI-powered preliminary analysis of common skin conditions. 
              Designed specifically for Kota's student community to promote early health awareness.
            </p>
          </div>

          {!isAuthenticated ? (
            <div className="space-y-4">
              <Button 
                size="lg" 
                onClick={() => setShowAuthModal(true)}
                className="medical-button text-lg px-8 py-3"
              >
                <Eye className="mr-2 h-5 w-5" />
                Start Skin Analysis
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <p className="text-sm text-muted-foreground">
                Sign in to access AI-powered screening • Free for students
              </p>
            </div>
          ) : (
            <Alert className="max-w-md mx-auto border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                You're signed in! Scroll down to start your skin analysis.
              </AlertDescription>
            </Alert>
          )}
        </section>

        {/* Main Analysis Tool */}
        {isAuthenticated && (
          <section className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-foreground">AI Skin Analysis</h2>
              <p className="text-muted-foreground">
                Upload a clear image for instant dermatological screening
              </p>
            </div>
            <SkinAnalyzer />
          </section>
        )}

        {/* Features Section */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Why Students Choose Health Vision</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built with the understanding that student health often takes a backseat to academic pressures
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="medical-card hover:shadow-lg medical-transition">
                <CardHeader className="pb-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-2">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Conditions We Screen */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Conditions We Screen</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our AI model can identify common dermatological conditions affecting students
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {conditions.map((condition, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:shadow-md medical-transition">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="font-medium text-foreground">{condition}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Important Disclaimer */}
        <section className="max-w-4xl mx-auto">
          <Alert className="border-amber-200 bg-amber-50">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            <AlertDescription className="text-amber-800">
              <strong>Medical Disclaimer:</strong> Health Vision provides preliminary AI-based screening for educational and awareness purposes only. 
              This is not a substitute for professional medical diagnosis or treatment. Always consult qualified healthcare providers for medical concerns. 
              For urgent conditions, seek immediate medical attention.
            </AlertDescription>
          </Alert>
        </section>

        {/* CTA Section for Non-Authenticated Users */}
        {!isAuthenticated && (
          <section className="text-center py-12 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl">
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-foreground">Ready to Check Your Skin Health?</h2>
                <p className="text-muted-foreground">
                  Join thousands of students taking proactive steps toward better health
                </p>
              </div>
              <Button 
                size="lg"
                onClick={() => setShowAuthModal(true)}
                className="medical-button text-lg px-8 py-3"
              >
                <Stethoscope className="mr-2 h-5 w-5" />
                Get Started - It's Free
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-muted/30 border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              <span className="font-semibold text-foreground">Health Vision</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Empowering Kota students with AI-driven health awareness
            </p>
            <p className="text-xs text-muted-foreground">
              Built for educational purposes • Always consult healthcare professionals
            </p>
          </div>
        </div>
      </footer>

      <AuthModal 
        open={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </div>
  );
}