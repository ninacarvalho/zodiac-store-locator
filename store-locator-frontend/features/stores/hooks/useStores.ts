import { useEffect, useState } from 'react';
import { getStores } from '../services/storeService';
import { Store } from '../types';

export const useStores = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStores()
      .then(setStores)
      .catch((e) => console.error('Failed to fetch stores:', e))
      .finally(() => setLoading(false));
  }, []);

  return { stores, loading };
};
