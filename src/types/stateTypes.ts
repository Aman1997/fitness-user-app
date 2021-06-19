export interface IMembershipData {
  id: string;
  to: string;
  from: string;
  fitnessService: {
    id: string;
    name: string;
    imageUrl: string;
  };
}