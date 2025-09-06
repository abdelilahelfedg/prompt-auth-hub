import { Check, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";

export default function Pricing() {
  const { profile } = useAuth();
  const currentPlan = profile?.plan || 'free';

  const plans = [
    {
      name: "Free",
      price: "0€",
      period: "/mois",
      description: "Accès de base aux propriétés",
      features: [
        "Photos des propriétés",
        "Description publique",
        "Quartier",
        "Prix de location",
        "Type de logement"
      ],
      limitations: [
        "Pas de contact propriétaire",
        "Pas d'adresse exacte",
        "Pas de surface réelle",
        "Pas de charges détaillées",
        "Pas de plan PDF"
      ],
      current: currentPlan === 'free',
      buttonText: currentPlan === 'free' ? "Plan actuel" : "Rétrograder",
      variant: "outline" as const
    },
    {
      name: "Premium",
      price: "9€",
      period: "/mois",
      description: "Accès complet aux propriétés",
      features: [
        "Tout du plan Free",
        "Téléphone du propriétaire",
        "Adresse exacte",
        "Surface réelle en m²",
        "Charges détaillées",
        "Plan PDF téléchargeable",
        "Détails avancés",
        "Support prioritaire"
      ],
      limitations: [],
      current: currentPlan === 'premium',
      buttonText: currentPlan === 'premium' ? "Plan actuel" : "Passer au Premium",
      variant: "default" as const,
      popular: true
    }
  ];

  const handlePlanChange = (planName: string) => {
    if (planName.toLowerCase() === currentPlan) return;
    
    // Pour l'instant, juste une alerte car pas de paiement implémenté
    alert(`Changement de plan vers ${planName} (fonctionnalité à venir)`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Choisissez votre plan</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Accédez à toutes les informations des propriétés avec notre plan Premium
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">
                    <Crown className="w-4 h-4 mr-1" />
                    Populaire
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="flex items-baseline justify-center mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground ml-1">{plan.period}</span>
                </div>
              </CardHeader>

              <CardContent className="pt-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm uppercase tracking-wide text-primary mb-3">
                      Inclus
                    </h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {plan.limitations.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-3">
                        Non inclus
                      </h4>
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation, index) => (
                          <li key={index} className="flex items-center gap-2 text-muted-foreground">
                            <div className="w-4 h-4 flex-shrink-0 flex items-center justify-center">
                              <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                            </div>
                            <span className="text-sm">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  variant={plan.variant}
                  className="w-full"
                  disabled={plan.current}
                  onClick={() => handlePlanChange(plan.name)}
                >
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-muted rounded-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold mb-4">Questions fréquentes</h3>
            <div className="space-y-4 text-left">
              <div>
                <h4 className="font-medium">Comment changer de plan ?</h4>
                <p className="text-sm text-muted-foreground">
                  Pour l'instant, les changements de plan se font manuellement. 
                  Contactez l'administrateur pour modifier votre plan.
                </p>
              </div>
              <div>
                <h4 className="font-medium">Puis-je annuler à tout moment ?</h4>
                <p className="text-sm text-muted-foreground">
                  Oui, vous pouvez revenir au plan gratuit à tout moment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}