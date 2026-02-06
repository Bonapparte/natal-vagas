-- NATAL VAGAS PRO - DATABASE SCHEMA (Supabase/PostgreSQL)

-- 1. Tabela de Usuários (Extendendo o Auth do Supabase)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  cpf TEXT UNIQUE,
  birth_date DATE,
  whatsapp TEXT,
  user_type TEXT CHECK (user_type IN ('candidate', 'employer', 'admin')) DEFAULT 'candidate',
  is_verified BOOLEAN DEFAULT FALSE,
  kyc_status TEXT CHECK (kyc_status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tabela de Vagas
CREATE TABLE IF NOT EXISTS public.jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  employer_id UUID REFERENCES auth.users ON DELETE SET NULL,
  title TEXT NOT NULL,
  company_name TEXT NOT NULL,
  description TEXT NOT NULL,
  location_bairro TEXT NOT NULL,
  latitude FLOAT8,
  longitude FLOAT8,
  salary_range TEXT,
  job_type TEXT CHECK (job_type IN ('presencial', 'hibrido', 'remoto')) DEFAULT 'presencial',
  category TEXT NOT NULL,
  is_premium BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Tabela de Candidaturas
CREATE TABLE IF NOT EXISTS public.applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID REFERENCES public.jobs ON DELETE CASCADE,
  candidate_id UUID REFERENCES auth.users ON DELETE CASCADE,
  status TEXT CHECK (status IN ('applied', 'reviewing', 'interview', 'hired', 'rejected')) DEFAULT 'applied',
  notes TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  feedback_candidate TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(job_id, candidate_id)
);

-- 3.1 Histórico de Status da Candidatura
CREATE TABLE IF NOT EXISTS public.application_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  application_id UUID REFERENCES public.applications ON DELETE CASCADE,
  status TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Tabela de Documentos KYC (Caminhos no Storage)
CREATE TABLE IF NOT EXISTS public.kyc_documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  doc_front_path TEXT,
  doc_back_path TEXT,
  selfie_path TEXT,
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kyc_documents ENABLE ROW LEVEL SECURITY;

-- Políticas de Segurança Simples
CREATE POLICY "Profiles are viewable by owner" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Jobs are viewable by everyone" ON public.jobs FOR SELECT USING (true);
CREATE POLICY "Applications viewable by candidate and employer" ON public.applications FOR SELECT USING (auth.uid() = candidate_id OR auth.uid() = (SELECT employer_id FROM jobs WHERE id = job_id));
