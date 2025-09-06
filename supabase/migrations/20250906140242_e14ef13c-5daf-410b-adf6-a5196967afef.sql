-- Create properties table
CREATE TABLE public.properties (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id UUID NOT NULL REFERENCES public.profiles(user_id),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  public_description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  neighborhood TEXT NOT NULL,
  exact_address TEXT NOT NULL,
  phone TEXT NOT NULL,
  real_surface DECIMAL(8,2) NOT NULL,
  charges DECIMAL(8,2) NOT NULL,
  pdf_plan_url TEXT,
  advanced_details JSONB DEFAULT '{}',
  photos TEXT[] DEFAULT ARRAY[]::TEXT[],
  property_type TEXT NOT NULL DEFAULT 'apartment',
  status TEXT NOT NULL DEFAULT 'available',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- Create policies for property access
CREATE POLICY "Anyone can view basic property info" 
ON public.properties 
FOR SELECT 
USING (true);

CREATE POLICY "Property owners can manage their properties" 
ON public.properties 
FOR ALL 
USING (auth.uid() = owner_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_properties_updated_at
BEFORE UPDATE ON public.properties
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample properties for testing
INSERT INTO public.properties (
  owner_id, 
  title, 
  description, 
  public_description, 
  price, 
  neighborhood, 
  exact_address, 
  phone, 
  real_surface, 
  charges,
  photos,
  property_type
) VALUES 
(
  (SELECT user_id FROM public.profiles LIMIT 1),
  'Appartement moderne avec vue sur mer',
  'Magnifique appartement de 85m² avec une vue imprenable sur la mer. Entièrement rénové avec des matériaux haut de gamme. Cuisine équipée, 2 chambres, grand salon avec baie vitrée. Parking inclus. Proche commerces et transports.',
  'Bel appartement moderne avec vue, proche commerces et transports.',
  1250.00,
  'Centre-ville',
  '15 Rue de la République, 06000 Nice',
  '+33 6 12 34 56 78',
  85.50,
  150.00,
  ARRAY['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800', 'https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=800'],
  'apartment'
),
(
  (SELECT user_id FROM public.profiles LIMIT 1),
  'Studio cozy au cœur du quartier latin',
  'Charmant studio de 35m² idéalement situé dans le quartier latin. Complètement meublé et équipé. Parfait pour étudiant ou jeune professionnel. Internet fibre inclus. Métro à 2 minutes.',
  'Studio meublé bien situé, parfait pour étudiant.',
  850.00,
  'Quartier Latin',
  '8 Rue des Écoles, 75005 Paris',
  '+33 6 98 76 54 32',
  35.00,
  80.00,
  ARRAY['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'],
  'studio'
);