import { getBaskets, getCategories, getCustomers, getProducts, getStudents } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

export const useGetStudents = (offset, pageLimit, country) => {
  return useQuery({
    queryKey: ['students', offset, pageLimit, country],
    queryFn: async () => getStudents(offset, pageLimit, country)
  });
};

export const useGetCustomers = (offset, pageLimit, country) => {
  return useQuery({
    queryKey: ['customers', offset, pageLimit, country],
    queryFn: async () => getCustomers(offset, pageLimit, country)
  });
};

export const useGetCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => getCategories()
  });
};


export const useGetBaskets = (offset, pageLimit, country) => {
  return useQuery({
    queryKey: ['baskets', offset, pageLimit, country],
    queryFn: async () => getBaskets(offset, pageLimit, country)
  });
};
export const useGetProducts = (offset?, pageLimit?, country?) => {
  return useQuery({
    queryKey: ['products', offset, pageLimit, country],
    queryFn: async () => getProducts(offset, pageLimit, country)
  });
};
