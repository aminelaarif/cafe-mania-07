
import { MenuItem } from '@/db/mockdata/menu';
import { mockGlobalConfiguration } from '@/db/mockdata/globalConfig';

const getGlobalConfig = () => {
  try {
    const stored = localStorage.getItem('global-configuration');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Erreur lors du chargement de la configuration:', error);
  }
  return mockGlobalConfiguration;
};

const formatPriceForList = (price: number): string => {
  const config = getGlobalConfig();
  const formattedPrice = price.toFixed(2);
  return config.currency.position === 'before' 
    ? `${config.currency.symbol}${formattedPrice}`
    : `${formattedPrice}${config.currency.symbol}`;
};

export const generateListContent = (items: MenuItem[], categoryName: string, includeAvailability: boolean = false): string => {
  const config = getGlobalConfig();
  const currencySymbol = config.currency.symbol;
  
  let content = `# Liste - ${categoryName} - Date\n`;
  content += `| **Produit** | **Prix ${currencySymbol}** | **Description** |\n`;
  
  if (includeAvailability) {
    content = `# Liste - ${categoryName} - Date\n`;
    content += `| **Produit** | **Prix ${currencySymbol}** | **Description** | **Disponibilité** |\n`;
    content += `| ----------- | ------------ | --------------- | ---------------- |\n`;
    
    items.forEach(item => {
      const price = formatPriceForList(item.price);
      const availability = item.available ? 'Disponible' : 'Indisponible';
      content += `| ${item.name} | ${price} | ${item.description || ''} | ${availability} |\n`;
    });
  } else {
    content += `| ----------- | ------------ | --------------- |\n`;
    
    items.forEach(item => {
      const price = formatPriceForList(item.price);
      content += `| ${item.name} | ${price} | ${item.description || ''} |\n`;
    });
  }
  
  return content;
};

export const parseListContent = (content: string): { items: MenuItem[]; duplicateLines: string[] } => {
  const lines = content.split('\n').filter(line => line.trim());
  const items: MenuItem[] = [];
  const duplicateLines: string[] = [];
  const existingNames = new Set<string>();
  
  let isInTable = false;
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // Détecter le début du tableau
    if (trimmedLine.includes('|') && trimmedLine.includes('**Produit**')) {
      isInTable = true;
      continue;
    }
    
    // Ignorer la ligne de séparation du tableau
    if (trimmedLine.match(/^\|[\s\-|]+\|$/)) {
      continue;
    }
    
    // Parser les lignes de données
    if (isInTable && trimmedLine.startsWith('|') && trimmedLine.endsWith('|')) {
      const parts = trimmedLine.split('|').map(part => part.trim()).filter(part => part);
      
      if (parts.length >= 3) {
        const name = parts[0];
        const priceStr = parts[1];
        const description = parts[2];
        const availability = parts.length > 3 ? parts[3] : 'Disponible';
        
        // Nettoyer le prix (enlever les symboles de devise)
        const price = parseFloat(priceStr.replace(/[^\d.,]/g, '').replace(',', '.'));
        
        if (name && !isNaN(price)) {
          if (existingNames.has(name.toLowerCase())) {
            duplicateLines.push(trimmedLine);
          } else {
            existingNames.add(name.toLowerCase());
            items.push({
              id: `item-${Date.now()}-${Math.random()}`,
              name,
              description,
              price,
              category: '',
              available: availability.toLowerCase().includes('disponible')
            });
          }
        }
      }
    }
  }
  
  return { items, duplicateLines };
};

export const downloadFile = (content: string, filename: string) => {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const parseListFile = (content: string, categoryId: string): MenuItem[] => {
  const { items } = parseListContent(content);
  return items.map(item => ({
    ...item,
    category: categoryId
  }));
};

export const checkForDuplicates = (items: MenuItem[]): { hasDuplicates: boolean; duplicateLines: string[] } => {
  const names = new Set<string>();
  const duplicateLines: string[] = [];
  
  for (const item of items) {
    if (names.has(item.name.toLowerCase())) {
      duplicateLines.push(`| ${item.name} | ${item.price} | ${item.description || ''} |`);
    } else {
      names.add(item.name.toLowerCase());
    }
  }
  
  return {
    hasDuplicates: duplicateLines.length > 0,
    duplicateLines
  };
};

export const generateTemplate = (categoryName: string): string => {
  const config = getGlobalConfig();
  const currencySymbol = config.currency.symbol;
  
  return `# Liste - ${categoryName} - Date
| **Produit** | **Prix (${currencySymbol})** | **Description** | **Disponibilité** |
| ----------- | ------------ | --------------- | ----------------- |
| Espresso | 2.50 | Café italien traditionnel | Disponible |
| Cappuccino | 3.00 | Café avec mousse de lait | Disponible |
| Croissant | 1.80 | Viennoiserie française | Indisponible |`;
};
