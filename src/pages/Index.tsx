import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { user, profile } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to OpenHome</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Your premier platform for real estate and property management
        </p>
        
        <div className="space-y-4 mb-8">
          <Button asChild size="lg">
            <Link to="/properties">Voir les propriétés</Link>
          </Button>
          
          <div className="flex gap-4 justify-center">
            <Button variant="outline" asChild>
              <Link to="/pricing">Plans & Tarifs</Link>
            </Button>
          </div>
        </div>
        
        {user && profile ? (
          <div className="space-y-4">
            <p className="text-lg">Welcome back, {profile.display_name || user.email}!</p>
            <Button asChild>
              <Link to={`/dashboard/${profile.role}`}>Go to Dashboard</Link>
            </Button>
          </div>
        ) : (
          <div className="space-x-4">
            <Button asChild>
              <Link to="/login">Sign In</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
