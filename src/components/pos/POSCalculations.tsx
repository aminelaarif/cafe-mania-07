
interface CalculationResult {
  subtotal: number;
  taxAmount: number;
  totalWithTax: number;
}

export const calculateTotals = (
  total: number,
  taxRate: number,
  includeInPrice: boolean
): CalculationResult => {
  let subtotal = total;
  let taxAmount = 0;
  let totalWithTax = total;
  
  if (includeInPrice) {
    taxAmount = total * taxRate / (100 + taxRate);
    subtotal = total - taxAmount;
  } else {
    taxAmount = total * taxRate / 100;
    totalWithTax = total + taxAmount;
  }

  return { subtotal, taxAmount, totalWithTax };
};
