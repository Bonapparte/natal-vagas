export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  lat: number;
  lng: number;
  type: 'Presencial' | 'Híbrido' | 'Remoto';
  salary?: string;
  category: string;
  isPremium: boolean;
  posted: string;
  description?: string;
}
