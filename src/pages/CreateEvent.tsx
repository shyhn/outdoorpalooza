
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { CalendarIcon, Upload, MapPin, Clock, Users, FileGpx, ImageIcon } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

// Form schema
const eventFormSchema = z.object({
  title: z.string().min(3, {
    message: "Le titre doit contenir au moins 3 caractères.",
  }),
  category: z.string({
    required_error: "Veuillez sélectionner une catégorie.",
  }),
  difficulty: z.string({
    required_error: "Veuillez sélectionner une difficulté.",
  }),
  date: z.date({
    required_error: "Veuillez sélectionner une date.",
  }),
  location: z.string().min(3, {
    message: "Veuillez indiquer un lieu.",
  }),
  duration: z.string().min(1, {
    message: "Veuillez indiquer une durée.",
  }),
  distance: z.string().min(1, {
    message: "Veuillez indiquer une distance.",
  }),
  maxParticipants: z.string().min(1, {
    message: "Veuillez indiquer un nombre maximum de participants.",
  }),
  description: z.string().min(10, {
    message: "La description doit contenir au moins 10 caractères.",
  }),
});

type EventFormValues = z.infer<typeof eventFormSchema>;

const CreateEvent = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [gpxFile, setGpxFile] = useState<File | null>(null);

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: "",
      category: "",
      difficulty: "",
      description: "",
      location: "",
      duration: "",
      distance: "",
      maxParticipants: "",
    },
  });

  // Redirect if user is not logged in
  React.useEffect(() => {
    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Vous devez être connecté pour créer un événement.",
        variant: "destructive",
      });
      navigate('/auth');
    }
  }, [user, navigate, toast]);

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // Convert FileList to array and create preview URLs
      const imageFiles = Array.from(files);
      const imageUrls = imageFiles.map(file => URL.createObjectURL(file));
      
      // Add new images to the existing ones
      setUploadedImages(prev => [...prev, ...imageUrls]);
      
      // Success toast
      toast({
        title: "Images ajoutées",
        description: `${imageFiles.length} image(s) ajoutée(s) avec succès.`,
      });
    }
  };

  // Handle GPX file upload
  const handleGpxUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      // Check if it's a GPX file
      if (file.name.endsWith('.gpx')) {
        setGpxFile(file);
        toast({
          title: "Fichier GPX ajouté",
          description: `${file.name} a été ajouté avec succès.`,
        });
      } else {
        toast({
          title: "Format incorrect",
          description: "Veuillez sélectionner un fichier au format GPX.",
          variant: "destructive",
        });
      }
    }
  };

  // Form submission handler
  const onSubmit = async (data: EventFormValues) => {
    // For demo purposes, we'll just show the data in a toast and console
    console.log("Form data:", data);
    console.log("Images:", uploadedImages.length);
    console.log("GPX file:", gpxFile);
    
    // In a real app, you would upload the data to Supabase here
    toast({
      title: "Événement créé",
      description: "Votre événement a été créé avec succès !",
    });
    
    // Redirect to events page
    navigate('/events');
  };

  return (
    <div className="min-h-screen bg-forest-50 p-4 pb-20">
      <Card className="max-w-2xl mx-auto mt-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-forest-800">Créer un événement</CardTitle>
          <CardDescription>
            Remplissez le formulaire ci-dessous pour créer un nouvel événement.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Basic Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-forest-700 border-b pb-2">
                  📝 Informations de base
                </h3>
                
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Titre</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Randonnée au Mont Blanc" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Catégorie</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez une catégorie" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="hiking">Randonnée</SelectItem>
                            <SelectItem value="trail">Trail</SelectItem>
                            <SelectItem value="bivouac">Bivouac</SelectItem>
                            <SelectItem value="climbing">Escalade</SelectItem>
                            <SelectItem value="cycling">Vélo</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="difficulty"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Difficulté</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez une difficulté" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="easy">Facile</SelectItem>
                            <SelectItem value="medium">Moyen</SelectItem>
                            <SelectItem value="hard">Difficile</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              {/* Event Details Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-forest-700 border-b pb-2">
                  📅 Détails de l'événement
                </h3>
                
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={`w-full justify-start text-left font-normal ${
                                !field.value && "text-muted-foreground"
                              }`}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? (
                                format(field.value, "PPP", { locale: fr })
                              ) : (
                                <span>Sélectionnez une date</span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lieu</FormLabel>
                      <FormControl>
                        <div className="flex">
                          <Input 
                            placeholder="Ex: Col de la Forclaz, Chamonix" 
                            {...field} 
                            className="flex-grow"
                          />
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="icon" 
                            className="ml-2"
                            onClick={() => console.log('Open map picker')}
                          >
                            <MapPin className="h-4 w-4" />
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Durée (heures)</FormLabel>
                        <FormControl>
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                            <Input 
                              type="number" 
                              min="0.5" 
                              step="0.5" 
                              placeholder="Ex: 4.5" 
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="distance"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Distance (km)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            min="0.1" 
                            step="0.1" 
                            placeholder="Ex: 12.5" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="maxParticipants"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Max participants</FormLabel>
                        <FormControl>
                          <div className="flex items-center">
                            <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                            <Input 
                              type="number" 
                              min="1" 
                              step="1" 
                              placeholder="Ex: 10" 
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Décrivez votre événement en détail..." 
                          className="resize-none min-h-32" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              {/* Media Upload Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-forest-700 border-b pb-2">
                  📸 Médias
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FormLabel>Photos</FormLabel>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition cursor-pointer">
                      <Input
                        type="file"
                        id="imageUpload"
                        className="hidden"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                      />
                      <label 
                        htmlFor="imageUpload" 
                        className="cursor-pointer flex flex-col items-center"
                      >
                        <ImageIcon className="h-10 w-10 text-gray-400 mb-2" />
                        <span className="text-sm font-medium text-forest-700">
                          Cliquez pour ajouter des photos
                        </span>
                        <span className="text-xs text-gray-500 mt-1">
                          Ou glissez-déposez les fichiers ici
                        </span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <FormLabel>Fichier GPX (parcours)</FormLabel>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition cursor-pointer">
                      <Input
                        type="file"
                        id="gpxUpload"
                        className="hidden"
                        accept=".gpx"
                        onChange={handleGpxUpload}
                      />
                      <label 
                        htmlFor="gpxUpload" 
                        className="cursor-pointer flex flex-col items-center"
                      >
                        <FileGpx className="h-10 w-10 text-gray-400 mb-2" />
                        <span className="text-sm font-medium text-forest-700">
                          Cliquez pour ajouter un fichier GPX
                        </span>
                        <span className="text-xs text-gray-500 mt-1">
                          Format .gpx uniquement
                        </span>
                      </label>
                    </div>
                    {gpxFile && (
                      <div className="mt-2 text-sm text-forest-600 bg-forest-50 p-2 rounded flex items-center">
                        <FileGpx className="h-4 w-4 mr-2" />
                        {gpxFile.name}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Image Preview Carousel */}
                {uploadedImages.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">Aperçu des images</h4>
                    <Carousel className="w-full max-w-md mx-auto">
                      <CarouselContent>
                        {uploadedImages.map((image, index) => (
                          <CarouselItem key={index}>
                            <div className="p-1">
                              <div className="relative aspect-video overflow-hidden rounded-lg">
                                <img
                                  src={image}
                                  alt={`Preview ${index + 1}`}
                                  className="object-cover w-full h-full"
                                />
                              </div>
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious />
                      <CarouselNext />
                    </Carousel>
                  </div>
                )}
              </div>
              
              <Button 
                type="submit" 
                className="w-full md:w-auto bg-forest-600 hover:bg-forest-700"
              >
                Créer l'événement
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <BottomNavigation />
    </div>
  );
};

export default CreateEvent;
