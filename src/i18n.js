import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {}
  },
  pt: {
    translation: {
      'Account': 'Conta',
      'Actions': 'Ações',
      'Analytics': 'Analítica',
      'Apps': 'Apps',
      'Auth': 'Autenticação',
      'Available stock (highest)': 'Estoque disponível (mais alto)',
      'Available stock (lowest)': 'Estoque disponível (mais baixo)',
      'Blog': 'Blog',
      'Browse': 'Buscar',
      'Calendar': 'Calendário',
      'Category': 'Categoria',
      'Chat': 'Chat',
      'Checkout': 'Pago',
      'Contact': 'Contato',
      'Customers': 'Clientes',
      'Dashboard: Inventory List': 'Painel: Lista de inventário',
      'Details': 'Detalhes',
      'Documentation': 'Documentação',
      'Edit': 'Editar',
      'Error': 'Erro',
      'Expiry Date': 'Data de validade',
      'Feed': 'Fuente social',
      'Finance': 'Finanças',
      'General': 'Geral',
      'Good Afternoon': 'Boa tarde',
      'Good Evening': 'Boa noite',
      'Good Morning': 'Bom dia',
      'Inventory': 'Inventário',
      'Inventories': 'Inventários',
      'Invoices': 'Faturas',
      'Job Listings': 'Lista de trabalhos',
      'Kanban': 'Kanban',
      'Last update (newest)': 'Última atualização (mais recente)',
      'Last update (oldest)': 'Última atualização (mais antiga)',
      'Language changed': 'Idioma modificado',
      'List': 'Lista',
      'Login': 'Login',
      'Logistics': 'Logística',
      'Mails':'Email', 
      'Management': 'Gestão', 
      'Name':'Nome', 
      'Need Help?':'Precisa de ajuda?', 
      'Number of Products in Stock':'Número de produtos em estoque', 
      'Pages':'Páginas', 
      'post Create':'Create articulo', 
      'post Details':'Detalles del articulo', 
      'post List':'Lista de articulos', 
      'Pricing':'Preços', 
      'Profile':'Perfil', 
      'Production':'Produção', 
      'Products List':'Lista de produtos', 
      'Products Sold':'Produtos vendidos', 
      'Social Media':'Redes sociais', 
      'Sort By':'Ordenar por', 
      'Total Inventory':'Inventário total',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });
