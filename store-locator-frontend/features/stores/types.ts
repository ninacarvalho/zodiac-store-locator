export interface Store {
  id: number;
  name: string;
  rating: number;
  description?: string;
  latitude: number;
  longitude: number;
  imageUrl: string;
}