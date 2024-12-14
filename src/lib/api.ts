import axios from 'axios';
// ---------------------------- Student API ------------------------------------------------- //
// export async function resendEmail(email: string) {
//     try {
//       const res = await axios.post("/auth/register/resend-email/", { email });
//       return res.data;
//     } catch (error) {
//       console.log(error);
//       return error;
//     }
// }

export async function getStudents(
  offset: number,
  pageLimit: number,
  country: string
) {
  try {
    const res = await axios.get(`https://api.tamkeen.center/api/transactions`);
    return res.data.transactions;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getCustomers(
  offset: number = 0,
  pageLimit: number = 20,
  country?: string
) {
  try {
    const params: Record<string, any> = {
      offset,
      limit: pageLimit,
    };

    if (country) {
      params.country = country;
    }

    const res = await axios.get('https://api.tamkeen.center/api/users', {
      params,
    });

    return res.data;
  } catch (error: any) {
    console.error('Error fetching customers:', error.message);
    return null;
  }
}
export async function getProducts(
  offset: number = 0,
  pageLimit: number = 20,
  country?: string
) {
  try {
    const params: Record<string, any> = {
      offset,
      limit: pageLimit,
    };

    if (country) {
      params.country = country;
    }
    const token = localStorage.getItem("token");

    const res = await axios.get('https://api.tamkeen.center/api/products', {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    return res.data;
  } catch (error: any) {
    console.error('Error fetching customers:', error.message);
    return null;
  }
}
export async function getBaskets(
  offset: number = 0,
  pageLimit: number = 20,
  country?: string
) {
  try {
    const params: Record<string, any> = {
      offset,
      limit: pageLimit,
    };

    if (country) {
      params.country = country;
    }
    const token = localStorage.getItem("token");

    const res = await axios.get('https://api.tamkeen.center/api/packages', {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    return res.data;
  } catch (error: any) {
    console.error('Error fetching customers:', error.message);
    return null;
  }
}
export async function getCategories(

) {
  try {
    const res = await axios.get(`https://api.tamkeen.center/api/categories`);
    return res.data;  // Adjust this line based on the actual API response
  } catch (error) {
    console.log(error);
    return [];
  }
}