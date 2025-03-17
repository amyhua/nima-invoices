import { useMemo } from "react";

const Invoice: React.FC<{
  data: InvoiceData;
}> = ({ data }) => {
  const balanceSubtotal = useMemo(() => {
    if (!data.items) return 0;
    const total = data.items.reduce((total, item) => {
      return total + (item.total ?? item.price_per * item.quantity);
    }, 0);
    return total;
  }, [data]);
  const balanceTax = useMemo(() => {
    if (!data.items) return 0;
    const tax = balanceSubtotal * (data.tax_percent / 100);
    return tax;
  }, [balanceSubtotal, data]);
  const balanceDueTotal = useMemo(() => {
    if (!data.items) return 0;
    return balanceSubtotal + balanceTax;
  }, [data, balanceSubtotal, balanceTax]);

  return (
    <div className="flex flex-col gap-4 max-w-[700px] mx-auto my-8">
      <div className="flex flex-row justify-between">
        <div>
          <div className="pb-2">{data.date}</div>
          <h2 className="text-3xl font-bold">Nima Khazaei</h2>
          <h3 className="text-2xl font-semibold">
            {data.name} (#{data.invoice_number}) -- {data.job_title}
          </h3>
        </div>
        <div className="ml-8 text-right whitespace-nowrap">
          <div>2869 22nd St</div>
          <div>San Francisco, CA 94110</div>
          <div>+1 415 300-0424</div>
          <div>nima@nkimag.es</div>
        </div>
      </div>
      <div className="flex flex-row gap-4 vertical-bottom">
        <div className="flex flex-col justify-end">
          <div className="font-bold">{data.billing?.agent}</div>
          <div>{data.billing?.address}</div>
          <div>{data.billing?.tel}</div>
        </div>
        <div className="flex-1 text-right">
          <div className="font-bold">Balance Due</div>
          <div>{data.invoice_terms}</div>
          <div className="text-green-600 font-bold text-3xl my-1">
            ${balanceDueTotal.toLocaleString()}
          </div>
        </div>
      </div>
      <table className="my-8">
        <tbody>
          <tr className="font-bold text-left">
            <th className="min-w-[300px] border-b py-2">Item Description</th>
            <th className="pr-8 border-b">Quantity</th>
            <th className="pr-8 border-b">Price Per</th>
            <th className="text-right border-b">Total</th>
          </tr>
          {data.items?.map((item, index) => (
            <tr key={index} className="align-top">
              <td className="min-w-[300px] border-b py-2">
                <div>{item.name}</div>
                {item.dates?.length &&
                  item.dates.map((date, index) => (
                    <div
                      key={index}
                      className="pl-2 py-1 text-sm text-gray-500"
                    >
                      {date}
                    </div>
                  ))}
              </td>
              <td className="pr-8 py-2 border-b">
                {item.quantity.toLocaleString()}
              </td>
              <td className="pr-8 py-2 border-b">
                {item.price_per.toLocaleString()}
              </td>
              <td className="text-right py-2 border-b">
                {item.total?.toLocaleString() ??
                  (item.price_per * item.quantity).toLocaleString()}
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={4} className="border-b py-2">
              <div className="text-sm text-gray-500">
                * All amounts are in USD
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan={3} className="py-2">
              <div className="text-gray-500 text-right mr-3">Subtotal</div>
            </td>
            <td className="text-right">{balanceSubtotal.toLocaleString()}</td>
          </tr>
          <tr>
            <td colSpan={3} className="py-2">
              <div className="text-gray-500 text-right mr-3">
                Tax - {data.tax_percent}%
              </div>
            </td>
            <td className="text-right">{balanceTax.toLocaleString()}</td>
          </tr>
          <tr>
            <td colSpan={3} className="py-2">
              <div className="text-gray-500 text-right mr-3">Total</div>
            </td>
            <td className="text-right">{balanceDueTotal.toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Invoice;
