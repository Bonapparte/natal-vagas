const neighborhoods = [
  { id: 'ponta-negra', name: 'Ponta Negra', description: 'O bairro mais turístico de Natal, com grande foco em hotelaria, gastronomia e serviços.' },
  { id: 'lagoa-nova', name: 'Lagoa Nova', description: 'Centro administrativo e jurídico, com muitas clínicas, escritórios e oportunidades no setor de saúde.' },
  { id: 'tirol', name: 'Tirol', description: 'Bairro nobre com perfil residencial e comercial de alto padrão, ideal para serviços especializados.' },
  { id: 'alecrim', name: 'Alecrim', description: 'O maior centro comercial popular do RN, com milhares de vagas no varejo e comércio geral.' },
  { id: 'petropolis', name: 'Petrópolis', description: 'Bairro tradicional com comércio sofisticado, clínicas e setor de serviços premium.' },
  { id: 'capim-macio', name: 'Capim Macio', description: 'Zona Sul, com forte presença universitária e comercial, shopping centers e restaurantes.' },
  { id: 'neopolis', name: 'Neópolis', description: 'Bairro residencial com comércio local forte e proximidade com grandes hipermercados.' },
  { id: 'candelaria', name: 'Candelária', description: 'Próximo a shopping centers e órgãos governamentais, com boas oportunidades administrativas.' },
  { id: 'ribeira', name: 'Ribeira', description: 'Bairro histórico com foco em logística, porto e órgãos públicos.' },
  { id: 'pajucara', name: 'Pajuçara', description: 'Zona Norte, com forte crescimento residencial e comercial em expansão.' }
];

import fs from 'fs';
import path from 'path';

const outputPath = 'D:/natal-vagas/src/lib/neighborhoods.json';

fs.writeFileSync(outputPath, JSON.stringify(neighborhoods, null, 2));

console.log(`Generated SEO data for ${neighborhoods.length} neighborhoods.`);
