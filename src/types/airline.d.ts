 export interface IAirline {
  name: string;
  code: string; // e.g., PIA, Emirates
  logo?: string;
  country: string;
  contactEmail: string;
  contactPhone?: string;
  address?: string;
  isActive: boolean;
  createdBy: mongoose.Types.ObjectId; // admin or user who created airline
  createdAt: Date;
  updatedAt: Date;
}

export {}