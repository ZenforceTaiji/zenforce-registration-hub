
import { FINANCIAL_RULES } from "@/constants/financialRules";

export const validatePaymentAmount = (amount: number, type: 'session' | 'monthly') => {
  if (type === 'session' && amount < FINANCIAL_RULES.SESSION_FEE) {
    return { isValid: false, message: `Session fee must be at least R${FINANCIAL_RULES.SESSION_FEE / 100}` };
  }

  const minimumMonthlyFee = FINANCIAL_RULES.SESSION_FEE * FINANCIAL_RULES.MINIMUM_SESSIONS_PER_WEEK * 4;
  if (type === 'monthly' && amount < minimumMonthlyFee) {
    return { 
      isValid: false, 
      message: `Monthly fee must be at least R${minimumMonthlyFee / 100} (${FINANCIAL_RULES.MINIMUM_SESSIONS_PER_WEEK} sessions per week)`
    };
  }

  return { isValid: true };
};

export const validateDecemberPayment = () => {
  const today = new Date();
  const isDecember = today.getMonth() === 11;
  
  if (isDecember) {
    return { 
      isValid: false, 
      message: 'December training requires advance payment before the training date' 
    };
  }

  return { isValid: true };
};
