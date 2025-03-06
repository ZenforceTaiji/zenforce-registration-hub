
export interface StudentGalleryImage {
  id: string;
  title: string;
  date: string;
  url: string;
  category: string;
}

export interface StudentGalleryVideo {
  id: string;
  title: string;
  date: string;
  thumbnail: string;
  duration: string;
  category: string;
}

export interface PaymentRecord {
  id: string;
  date: string;
  description: string;
  amount: string;
  status: "Paid" | "Pending" | "Failed";
  receipt?: string;
  paymentMethod: string;
}

export interface GradingFee {
  id: string;
  gradingName: string;
  gradingDate: string;
  amount: number;
  isPaid: boolean;
  receiptId?: string;
}
