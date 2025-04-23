
export const TRAINING_PACKAGES = {
  QI_GONG: {
    name: "Qi Gong, Relaxation and Meditation",
    price: 6000, // R60.00 in cents
    schedule: "Mondays and Wednesdays",
    minSessions: 2,
    isOutdoor: false,
    location: "",
  },
  MARTIAL_ARTS: {
    name: "Martial Arts, Push Hands and Fitness",
    price: 8000, // R80.00 in cents
    schedule: "Tuesdays and Thursdays",
    minSessions: 2,
    isOutdoor: false,
    location: "",
  },
  SATURDAY: {
    name: "Health and Meditation",
    price: 4000, // R40.00 in cents
    schedule: "Saturday Mornings",
    minSessions: 1,
    isOutdoor: true,
    location: "Parks or Nature Reserves",
  },
};

export const FINANCIAL_RULES = {
  LATE_CANCELLATION_FEE: 18000, // R180.00 in cents
  LATE_PAYMENT_FEE_PER_DAY: 5000, // R50.00 in cents
  DEBT_COLLECTION_DAYS: 90,
  DEBT_COLLECTION_INTEREST: 35, // 35%
  CANCELLATION_NOTICE_DAYS: 30,
};

export const calculateMonthlyFee = (packageType: keyof typeof TRAINING_PACKAGES) => {
  const pkg = TRAINING_PACKAGES[packageType];
  return pkg.price * (pkg.minSessions || 1) * 4;
};

export const calculateLateFees = (daysLate: number) => {
  return FINANCIAL_RULES.LATE_PAYMENT_FEE_PER_DAY * daysLate;
};

export const calculateDebtCollectionAmount = (baseAmount: number) => {
  const interest = (baseAmount * FINANCIAL_RULES.DEBT_COLLECTION_INTEREST) / 100;
  return baseAmount + interest;
};
