import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const { role } = useParams<{ role: string }>();
  const { user, profile, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Redirect if user's role doesn't match the URL
  useEffect(() => {
    if (profile && role && profile.role !== role) {
      const correctPath = `/dashboard/${profile.role}`;
      navigate(correctPath, { replace: true });
    }
  }, [profile, role, navigate]);

  const handleSignOut = async () => {
    try {
      const { error } = await signOut();
      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "You have been signed out successfully.",
        });
        navigate('/');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while signing out.",
        variant: "destructive",
      });
    }
  };

  const getRoleDisplayName = (role: string) => {
    const roleMap: Record<string, string> = {
      buyer: 'Buyer',
      seller: 'Seller',
      tenant: 'Tenant',
      flatmate: 'Flatmate',
      admin: 'Admin'
    };
    return roleMap[role] || role;
  };

  const getRoleDescription = (role: string) => {
    const descriptions: Record<string, string> = {
      buyer: 'Browse and purchase properties',
      seller: 'List and manage your properties',
      tenant: 'Find rental properties and manage tenancy',
      flatmate: 'Find flatmates and shared accommodations',
      admin: 'Manage the platform and users'
    };
    return descriptions[role] || 'Manage your account';
  };

  if (!profile || !role) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">
              {getRoleDisplayName(role)} Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">
              Welcome back, {profile.display_name || user?.email}
            </p>
          </div>
          <Button onClick={handleSignOut} variant="outline">
            Sign Out
          </Button>
        </div>

        {/* Dashboard Content */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <p className="font-medium">Email</p>
                <p className="text-muted-foreground">{profile.email}</p>
              </div>
              <div>
                <p className="font-medium">Role</p>
                <p className="text-muted-foreground">{getRoleDisplayName(profile.role)}</p>
              </div>
              <div>
                <p className="font-medium">Plan</p>
                <p className="text-muted-foreground capitalize">{profile.plan}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Role Features</CardTitle>
              <CardDescription>{getRoleDescription(role)}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Role-specific features will be implemented here based on your {getRoleDisplayName(role).toLowerCase()} role.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks for your role</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Quick action buttons and shortcuts will be available here.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;