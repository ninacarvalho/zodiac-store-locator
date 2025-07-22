// features/stores/services/storeService.ts
import { api } from '../../../services/api';
import { Store } from '../types';

export const getStores = async (): Promise<Store[]> => {
  const response = await api.get<Store[]>('/stores');
  return response.data;
};
