
export interface LocationData {
  id: string;
  name: string;
  type: 'country' | 'region' | 'city';
  region?: string;
  country?: string;
}
