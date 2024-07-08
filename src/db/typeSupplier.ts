export type typeSupplier = {
  // Identificativo Univoco
  UID: string;
  // Name of the supplier
  name: string;
  // Phone number of the supplier
  phone: number;
  // Email address of the supplier
  email: string;
  // Address of the supplier
  address: string;
  // City of the supplier
  city: string;
  // Postal code of the supplier
  postalCode: string;
  // Country of the supplier
  country: string;
  // Website of the supplier
  website: string;
  // Additional notes about the supplier
  notes: string;
  // Name of the contact person at the supplier
  contactPerson: string;
  // Phone number of the contact person
  contactPersonPhone: number;
  // Email address of the contact person
  contactPersonEmail: string;
  // Payment terms with the supplier
  paymentTerms: string;
  // Delivery terms with the supplier
  deliveryTerms: string;
  // Categories of products supplied
  productCategoriesUIDs: string[];
  // Flag indicating if the supplier is active
  isActive: boolean;
  // Date the supplier was created
  createdAt: Date;
  // Date the supplier was last updated
  updatedAt: Date;
};
