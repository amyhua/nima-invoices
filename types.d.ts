type InvoiceItem = {
  name: string;
  dates: string[];
  quantity: number;
  price_per: number;
  total: number;
};
type InvoiceData = {
  name: string;
  invoice_number: string;
  job_title: string;
  date: string;
  number: string;
  items: InvoiceItem[];
  header: {
    address: string;
    tel: string;
    email: string;
  };
  billing: {
    agent: string;
    address: string;
    tel?: string;
  };
  invoice_terms: string;
  tax_percent: number;
  published: boolean;
  total?: number;
};
