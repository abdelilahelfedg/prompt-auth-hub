import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Euro, Square } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Property {
  id: string;
  title: string;
  public_description: string;
  price: number;
  neighborhood: string;
  photos: string[];
  property_type: string;
}

export default function Properties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const { data, error } = await supabase
          .from('properties')
          .select('id, title, public_description, price, neighborhood, photos, property_type')
          .eq('status', 'available')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching properties:', error);
          return;
        }

        setProperties(data || []);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">Chargement des propriétés...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Propriétés disponibles</h1>
          <p className="text-muted-foreground">
            Découvrez nos propriétés à louer. Passez au plan Premium pour accéder à tous les détails.
          </p>
        </div>

        {properties.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-xl font-semibold mb-2">Aucune propriété disponible</h2>
            <p className="text-muted-foreground">Revenez bientôt pour découvrir de nouvelles offres.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <Link key={property.id} to={`/property/${property.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    {property.photos && property.photos.length > 0 ? (
                      <img
                        src={property.photos[0]}
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <span className="text-muted-foreground">Aucune photo</span>
                      </div>
                    )}
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="bg-background/80 text-foreground">
                        {property.property_type}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardHeader className="pb-2">
                    <CardTitle className="line-clamp-2 text-lg">{property.title}</CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {property.public_description}
                    </p>
                    
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {property.neighborhood}
                    </div>
                    
                    <div className="flex items-center gap-1 text-lg font-semibold text-primary">
                      <Euro className="w-5 h-5" />
                      {property.price.toLocaleString('fr-FR')} €/mois
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}