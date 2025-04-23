
import { TRAINING_PACKAGES } from "@/constants/financialRules";

export const validatePaymentAmount = (amount: number, type: 'session' | 'monthly', packageType: keyof typeof TRAINING_PACKAGES) => {
  const package_ = TRAINING_PACKAGES[packageType];
  
  if (type === 'session' && amount < package_.price) {
    return { 
      isValid: false, 
      message: `Session fee for ${package_.name} must be at least R${package_.price / 100}` 
    };
  }

  const minimumMonthlyFee = package_.price * (package_.minSessions || 1) * 4;
  if (type === 'monthly' && amount < minimumMonthlyFee) {
    return { 
      isValid: false, 
      message: `Monthly fee for ${package_.name} must be at least R${minimumMonthlyFee / 100} (${package_.minSessions || 1} sessions per week)`
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
