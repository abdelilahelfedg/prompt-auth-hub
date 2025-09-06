import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Phone, MapPin, Square, Euro, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GatingBadge } from "@/components/GatingBadge";
import { Separator } from "@/components/ui/separator";

interface Property {
  id: string;
  title: string;
  description: string;
  public_description: string;
  price: number;
  neighborhood: string;
  exact_address: string;
  phone: string;
  real_surface: number;
  charges: number;
  pdf_plan_url: string | null;
  advanced_details: any;
  photos: string[];
  property_type: string;
  status: string;
}

export default function Property() {
  const { id } = useParams<{ id: string }>();
  const { profile } = useAuth();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  const isPremium = profile?.plan === 'premium';

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return;

      try {
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          console.error('Error fetching property:', error);
          return;
        }

        setProperty(data);
      } catch (error) {
        console.error('Error fetching property:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">Chargement...</div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Propriété non trouvée</h1>
          <Link to="/">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à l'accueil
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à l'accueil
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Photos */}
          <div className="space-y-4">
            {property.photos && property.photos.length > 0 ? (
              <div className="grid gap-4">
                <img
                  src={property.photos[0]}
                  alt={property.title}
                  className="w-full h-96 object-cover rounded-lg"
                />
                {property.photos.length > 1 && (
                  <div className="grid grid-cols-2 gap-4">
                    {property.photos.slice(1, 3).map((photo, index) => (
                      <img
                        key={index}
                        src={photo}
                        alt={`${property.title} - ${index + 2}`}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full h-96 bg-muted rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground">Aucune photo disponible</span>
              </div>
            )}
          </div>

          {/* Informations principales */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
              <div className="flex items-center gap-2 text-2xl font-semibold text-primary">
                <Euro className="w-6 h-6" />
                {property.price.toLocaleString('fr-FR')} €/mois
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {isPremium ? property.description : property.public_description}
                </p>
                {!isPremium && (
                  <div className="mt-4 p-4 bg-muted rounded-lg border-2 border-dashed">
                    <div className="flex items-center gap-2 mb-2">
                      <GatingBadge />
                      <span className="text-sm font-medium">Contenu Premium</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Passez au plan Premium pour voir la description complète avec tous les détails.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Informations de localisation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Localisation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p><strong>Quartier:</strong> {property.neighborhood}</p>
                  {isPremium ? (
                    <p><strong>Adresse exacte:</strong> {property.exact_address}</p>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Adresse exacte:</span>
                      <GatingBadge />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Contact propriétaire */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Contact
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isPremium ? (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <a href={`tel:${property.phone}`} className="text-primary hover:underline">
                      {property.phone}
                    </a>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Téléphone du propriétaire:</span>
                    <GatingBadge />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Détails techniques */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Square className="w-5 h-5" />
                  Détails techniques
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {isPremium ? (
                    <>
                      <div className="flex justify-between">
                        <span>Surface réelle:</span>
                        <span className="font-medium">{property.real_surface} m²</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span>Charges:</span>
                        <span className="font-medium">{property.charges} €/mois</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span>Type:</span>
                        <span className="font-medium capitalize">{property.property_type}</span>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Surface réelle:</span>
                        <GatingBadge />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Charges:</span>
                        <GatingBadge />
                      </div>
                      <div className="flex justify-between">
                        <span>Type:</span>
                        <span className="font-medium capitalize">{property.property_type}</span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Plan PDF */}
            {isPremium && property.pdf_plan_url ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Plan du logement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" asChild>
                    <a href={property.pdf_plan_url} target="_blank" rel="noopener noreferrer">
                      <FileText className="w-4 h-4 mr-2" />
                      Télécharger le plan PDF
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ) : !isPremium ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Plan du logement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Plan PDF:</span>
                    <GatingBadge />
                  </div>
                </CardContent>
              </Card>
            ) : null}

            {/* Appel à l'action Premium */}
            {!isPremium && (
              <Card className="border-primary">
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <h3 className="text-lg font-semibold">Accédez à tous les détails</h3>
                    <p className="text-sm text-muted-foreground">
                      Avec le plan Premium, débloquez toutes les informations de contact, 
                      l'adresse exacte, les détails techniques et les plans.
                    </p>
                    <Link to="/pricing">
                      <Button className="w-full">
                        Passer au Premium
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}