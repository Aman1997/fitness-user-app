export interface IMembershipData {
  id: string;
  to: string;
  from: string;
  ratings?: number | undefined;
  address: string;
  fitnessService?: {
    id?: string;
    name?: string;
    imageUrl?: string;
    plans?: Array<{
      id?: string;
      price?: string;
      type?: number;
    }>;
  };
}
