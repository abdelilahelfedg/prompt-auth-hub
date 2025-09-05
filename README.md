# OpenHome - Real Estate Platform

A modern real estate platform built with React, TypeScript, Tailwind CSS, and Supabase.

## Features

- 🔐 **Authentication System**: Email/password authentication with Supabase Auth
- 👥 **Role-Based Access**: Support for buyer, seller, tenant, flatmate, and admin roles
- 🎯 **Dashboard**: Role-specific dashboards with personalized content
- 🔒 **Protected Routes**: Secure access to dashboard features
- 📱 **Responsive Design**: Beautiful, mobile-first design with Tailwind CSS
- ⚡ **Real-time Updates**: Powered by Supabase real-time capabilities

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Supabase account and project

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/abdelilahelfedg/prompt-lovable-ui.git
   cd prompt-lovable-ui
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Supabase**
   
   The project is already connected to Supabase. The configuration is handled automatically through Lovable's integration.
   
   **Important**: You need to configure the following in your Supabase project:

   a. **Authentication Settings**:
   - Go to Authentication > URL Configuration in your Supabase dashboard
   - Set **Site URL** to: `http://localhost:5173` (for local development)
   - Add **Redirect URLs**: 
     - `http://localhost:5173/`
     - Your production URL (when deployed)

   b. **Email Settings** (Optional):
   - Go to Authentication > Settings
   - Disable "Confirm email" for faster testing during development
   - Enable it again before going to production

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Open http://localhost:5173 in your browser
   - Click "Sign Up" to create a new account
   - Choose your role (buyer, seller, tenant, flatmate)
   - After verification, you'll be redirected to your role-specific dashboard

## User Roles

The platform supports five different user roles:

- **Buyer**: Browse and purchase properties
- **Seller**: List and manage properties for sale
- **Tenant**: Find rental properties and manage tenancy
- **Flatmate**: Find flatmates and shared accommodations  
- **Admin**: Platform management and user administration

Each role has its own dashboard with relevant features and tools.

## Authentication Flow

1. **Sign Up**: Users register with email/password and select their role
2. **Email Verification**: Supabase sends a verification email (can be disabled for testing)
3. **Sign In**: Users log in with their credentials
4. **Dashboard Redirect**: Users are automatically redirected to their role-specific dashboard
5. **Profile Creation**: User profiles are automatically created with the selected role

## Database Schema

### Profiles Table
```sql
- id (uuid, primary key)
- user_id (uuid, references auth.users)
- email (text)
- role (enum: buyer, seller, tenant, flatmate, admin)
- plan (enum: free, premium)
- display_name (text)
- created_at (timestamp)
- updated_at (timestamp)
```

## Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components (shadcn/ui)
│   └── ProtectedRoute.tsx
├── contexts/
│   └── AuthContext.tsx  # Authentication state management
├── pages/
│   ├── Index.tsx        # Home page
│   ├── Login.tsx        # Login page
│   ├── Signup.tsx       # Registration page
│   ├── Dashboard.tsx    # Role-based dashboard
│   └── NotFound.tsx     # 404 page
├── integrations/
│   └── supabase/        # Supabase client and types
└── App.tsx              # Main app component with routing
```

## Testing Authentication

1. **Create a Test Account**:
   - Go to `/signup`
   - Enter email, display name, select role, and password
   - Check email for verification (or skip if disabled)

2. **Test Login**:
   - Go to `/login`
   - Enter credentials
   - Verify redirect to correct dashboard (`/dashboard/{role}`)

3. **Test Route Protection**:
   - Try accessing `/dashboard/buyer` without being logged in
   - Should redirect to `/login`

4. **Test Role-based Access**:
   - Login as different roles
   - Verify each redirects to their specific dashboard

## How can I edit this code?

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/ddb53478-7498-46ab-ad3f-d74a2d0a59ed) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone https://github.com/abdelilahelfedg/prompt-lovable-ui.git

# Step 2: Navigate to the project directory.
cd prompt-lovable-ui

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## Technologies Used

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Supabase (Auth, Database, Real-time)
- **Routing**: React Router v6
- **State Management**: React Context API
- **Forms**: React Hook Form with Zod validation
- **UI Components**: Radix UI primitives

## Deployment

Simply open [Lovable](https://lovable.dev/projects/ddb53478-7498-46ab-ad3f-d74a2d0a59ed) and click on Share -> Publish.

## Custom Domain

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
