
import { MenuItem } from '@/db/mockdata/menu';

export const parseListFile = (content: string, categoryId: string): MenuItem[] => {
  const lines = content.split('\n').filter(line => line.trim());
  const items: MenuItem[] = [];
  
  // Ignorer les lignes de titre et de séparateur markdown
  const dataLines = lines.filter(line => 
    !line.startsWith('#') && 
    !line.startsWith('|') && 
    !line.includes('---') &&
    line.trim() !== ''
  );
  
  // Si pas de lignes de données, essayer de parser les lignes de tableau markdown
  if (dataLines.length === 0) {
    const tableLines = lines.filter(line => 
      line.startsWith('|') && 
      !line.includes('---') &&
      !line.includes('**Produit**') &&
      !line.includes('**Boisson**') &&
      line.trim() !== ''
    );
    
    tableLines.forEach((line, index) => {
      const parts = line.split('|').map(part => part.trim()).filter(part => part !== '');
      if (parts.length >= 4) {
        const [name, price, description, availability] = parts;
        items.push({
          id: `imported-${Date.now()}-${index}`,
          name: name.trim(),
          description: description.trim(),
          price: parseFloat(price.replace(/[^\d.,]/g, '').replace(',', '.')) || 0,
          category: categoryId,
          available: availability.toLowerCase().includes('disponible')
        });
      }
    });
  } else {
    // Parser l'ancien format
    dataLines.forEach((line, index) => {
      const parts = line.split('|').map(part => part.trim());
      if (parts.length >= 4) {
        const [name, price, description, availability] = parts;
        items.push({
          id: `imported-${Date.now()}-${index}`,
          name,
          description,
          price: parseFloat(price) || 0,
          category: categoryId,
          available: availability.toLowerCase() === 'true' || availability.toLowerCase() === 'disponible'
        });
      }
    });
  }
  
  return items;
};

export const checkForDuplicates = (items: MenuItem[]): { hasDuplicates: boolean; duplicateLines: string[] } => {
  const nameCount: { [key: string]: number } = {};
  const duplicates: string[] = [];
  
  items.forEach(item => {
    const name = item.name.trim().toLowerCase();
    nameCount[name] = (nameCount[name] || 0) + 1;
  });
  
  items.forEach(item => {
    const name = item.name.trim().toLowerCase();
    if (nameCount[name] > 1) {
      const duplicateLine = `| ${item.name} | ${item.price.toFixed(2)} | ${item.description} | ${item.available ? 'Disponible' : 'Indisponible'} |`;
      if (!duplicates.includes(duplicateLine)) {
        duplicates.push(duplicateLine);
      }
    }
  });
  
  return {
    hasDuplicates: duplicates.length > 0,
    duplicateLines: duplicates
  };
};

export const generateListContent = (items: MenuItem[], categoryName: string, isBackup = false): string => {
  const date = new Date().toLocaleDateString('fr-FR');
  const title = isBackup 
    ? `# Liste de sauvegarde - ${categoryName} - Arrêtée le ${date}`
    : `# Liste actuelle - ${categoryName} - ${date}`;
  
  const header = `${title}\n| **Produit** | **Prix (€)** | **Description** | **Disponibilité** |\n| ----------- | ------------ | --------------- | ----------------- |`;
  
  const content = items.map(item => 
    `| ${item.name} | ${item.price.toFixed(2)} | ${item.description} | ${item.available ? 'Disponible' : 'Indisponible'} |`
  ).join('\n');
  
  return header + '\n' + content;
};

export const generateTemplate = (categoryName: string): string => {
  return `# Modèle de liste - ${categoryName} - ${new Date().toLocaleDateString('fr-FR')}
| **Produit** | **Prix (€)** | **Description** | **Disponibilité** |
| ----------- | ------------ | --------------- | ----------------- |
| Exemple Produit 1 | 3.50 | Description du produit exemple | Disponible |
| Exemple Produit 2 | 4.20 | Autre description d'exemple | Indisponible |`;
};

export const downloadFile = (content: string, filename: string) => {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};
