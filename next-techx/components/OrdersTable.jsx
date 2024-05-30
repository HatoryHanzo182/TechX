import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tab } from "@headlessui/react";
import { useState, useEffect } from "react";
import Link from "next/link";

export function OrdersTable() 
{
  const [invoices, SetInvoices] = useState([]);

  useEffect(() => 
  {
    const GetHistory = async () => 
    {
      const u_t = localStorage.getItem("token");

      try 
      {
        const response = await fetch("https://squid-app-d6fho.ondigitalocean.app:443/GetOrderHistory", {
          method: "POST",
          headers: {"Content-Type": "application/json", "Authorization": `Bearer ${u_t}` }
        });

        if(response.ok) 
        {
          const data = await response.json();

          SetInvoices(data.order_history);
        } 
        else
          console.error("Failed to fetch order history");
      } 
      catch (error) { console.error("Error fetching order history:", error); }
    };

    GetHistory();
  }, []);

  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">#</TableHead>
          <TableHead>Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Date</TableHead>
          <TableHead className="text-right">Payment Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="">
        {invoices.map((invoice, index) => (
          invoice.products.map((product, productIndex) => (
            // <Link key={product._id} href={{ pathname: "/product-detail", query: { id: `${product._id}` }}}>
              <TableRow key={`${invoice._id}_${productIndex}`}>
                <TableCell className="font-medium">{index += 1}</TableCell>
                <TableCell>
                  <img src={`https://squid-app-d6fho.ondigitalocean.app:443/GetImage/${product.images[0]}`} className="w-12 h-12 flex flex-row" alt="Product"/>
                </TableCell>
                <TableCell>{product.model}</TableCell>
                <TableCell>{invoice.status}</TableCell>
                <TableCell className="text-right">{invoice.date}</TableCell>
                <TableCell className="text-right">{invoice.payment_method}</TableCell>
                <TableCell className="text-right">{product.price}$</TableCell>
              </TableRow>
            //</Link>
          ))
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-right">{invoices.reduce((total, invoice) => total + invoice.products.reduce((subtotal, product) => subtotal + product.price, 0), 0)}$</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
