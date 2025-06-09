 export function makeUniqueIds(categories) {
    const prefixMap = {
      mouse: 'M',
      smartwatch: 'S',
      buds: 'B',
      television: 'T',
      laptop: 'L',
      // add other categories here
    };
  
    const updatedCategories = {};
  
    for (const category in categories) {
      const prefix = prefixMap[category] || category.charAt(0).toUpperCase();
  
      updatedCategories[category] = categories[category].map(product => ({
        ...product,
        id: `${prefix}${product.id}`,  // unique id by prefix + original id
      }));
    }
  
    return updatedCategories;
  }
  