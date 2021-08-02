export interface IMembershipData {
  id: string;
  to: string;
  from: string;
  ratings?: number | undefined;
  address: string;
  fitnessService?: {
    id?: string;
    name?: string;
    ownerEmail?: string,
    imageUrl?: string;
    plans?: Array<{
      id?: string;
      price?: string;
      type?: number;
      batch?: number;
      days?: Array<number>;
    }>;
  };
}
