import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tab } from "@headlessui/react";

const invoices = [
  {
    invoice: "1",
    productName: "Apple iPhone 12 Pro",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
    productImage: "https://placekitten.com/200/200",
  },
  {
    invoice: "2",
    productName: "Apple iPhone 12 Pro",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
    productImage: "https://placekitten.com/200/200",
  },
  {
    invoice: "3",
    productName: "Apple iPhone 12 Pro",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
    productImage: "https://placekitten.com/200/200",
  },
  {
    invoice: "4",
    productName: "Apple iPhone 12 Pro",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
    productImage: "https://placekitten.com/200/200",
  },
  {
    invoice: "5",
    productName: "Apple iPhone 12 Pro",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
    productImage: "https://placekitten.com/200/200",
  },
  {
    invoice: "6",
    productName: "Apple iPhone 12 Pro",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
    productImage: [
      "https://placekitten.com/200/200",
      "https://placekitten.com/200/200",
      "https://placekitten.com/200/200",
      "https://placekitten.com/200/200",
    ],
  },
  {
    invoice: "7",
    productName: "Apple iPhone 12 Pro",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
    productImage: "https://placekitten.com/200/200",
  },
];

export function OrdersTable() {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">#</TableHead>
          <TableHead>Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead className="text-right">Payment Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="">
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>
              <img
                src={invoice.productImage}
                className="w-6 h-6 flex flex-row"
              />
            </TableCell>
            {/* <TableCell>
              {Array.isArray(invoice.productImage) &&
                invoice.productImage.map((image, index) => (
                  <img
                    key={index}
                    className="w-6 h-6 flex flex-row"
                    src={image}
                  />
                ))}
            </TableCell> */}
            <TableCell>{invoice.productName}</TableCell>
            <TableCell className="text-right">
              {invoice.paymentMethod}
            </TableCell>

            <TableCell className="text-right">{invoice.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
