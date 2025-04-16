
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EmailAuthForm from '@/components/auth/EmailAuthForm';
import GoogleSignInButton from '@/components/auth/GoogleSignInButton';
import { Separator } from '@/components/ui/separator';

const Auth = () => {
  return (
    <div className="min-h-screen bg-forest-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Bienvenue</CardTitle>
          <CardDescription>
            Connectez-vous ou créez un compte pour continuer
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login">Connexion</TabsTrigger>
              <TabsTrigger value="register">Inscription</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <EmailAuthForm mode="login" />
            </TabsContent>
            <TabsContent value="register">
              <EmailAuthForm mode="register" />
            </TabsContent>
          </Tabs>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Ou continuez avec
              </span>
            </div>
          </div>

          <GoogleSignInButton />
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
