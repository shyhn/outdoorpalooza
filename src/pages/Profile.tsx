
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import BottomNavigation from '@/components/layout/BottomNavigation';

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-forest-50 p-4">
      <Card className="max-w-md mx-auto mt-8">
        <CardHeader>
          <CardTitle>Mon Profil</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        </CardContent>
      </Card>
      <BottomNavigation />
    </div>
  );
};

export default Profile;
