useEffect(() => {
  const fetchPackageData = async () => {
    try {
      const response = await fetch(`https://api.tamkeen.center/api/packages/${paymentId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch package data');
      }

      const data = await response.json();
      
      setFormData({
        packageName: data.name || '',
        totalPrice: data.total_price || '',
        profitLevel1: data.profit_percentage_in_level_1 || '',
        profitLevel2: data.profit_percentage_in_level_2 || '',
        profitLevel3: data.profit_percentage_in_level_3 || '',
        numberOfUses: data.number_of_uses || '',
        bImages: data.images.map((img: any) => img.image) || [],
        images: [], // Image upload remains empty unless user uploads
        products: data.items.map((item: any) => ({
          id: item.product.id,
          name: item.product.name,
          price: parseFloat(item.product.price),
          size: item.product.size,
          color: item.product.color,
          style: item.product.style,
          capacity: item.product.capacity,
          material: item.product.material,
          weight: item.product.weight,
        })) || [],
        selectedProducts: data.items.map((item: any) => ({
          id: item.product.id,
          name: item.product.name,
          price: parseFloat(item.price),
          quantity: item.quantity,
          isEditing: false, // Initial state of editing
        })) || [],
      });

    } catch (error) {
      console.error('Error fetching package data:');
    }
  };

  fetchPackageData();
}, [paymentId]); 