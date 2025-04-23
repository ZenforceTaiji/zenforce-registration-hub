
export const FINANCIAL_RULES = {
  SESSION_FEE: 8000, // R80.00 in cents
  MINIMUM_SESSIONS_PER_WEEK: 2,
  LATE_CANCELLATION_FEE: 18000, // R180.00 in cents
  LATE_PAYMENT_FEE_PER_DAY: 5000, // R50.00 in cents
  DEBT_COLLECTION_DAYS: 90,
  DEBT_COLLECTION_INTEREST: 35, // 35%
  CANCELLATION_NOTICE_DAYS: 30,
};

export const calculateMonthlyFee = () => {
  return FINANCIAL_RULES.SESSION_FEE * FINANCIAL_RULES.MINIMUM_SESSIONS_PER_WEEK * 4;
};

export const calculateLateFees = (daysLate: number) => {
  return FINANCIAL_RULES.LATE_PAYMENT_FEE_PER_DAY * daysLate;
};

export const calculateDebtCollectionAmount = (baseAmount: number) => {
  const interest = (baseAmount * FINANCIAL_RULES.DEBT_COLLECTION_INTEREST) / 100;
  return baseAmount + interest;
};
