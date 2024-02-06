import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import { Models } from "appwrite";

export default function Customers({
  customers,
}: {
  customers: Models.Document[] | undefined;
}) {
  return (
    <div className="max-w-[2200px] w-full grid grid-cols-2 sm:grid-cols-2  md:py-0 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4">
      {customers?.map((customer) => (
        <Card key={customer.$createdAt} className="py-4 gap-4">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold">{customer.name}</p>
            <small className="text-default-500">{customer.email}</small>
            <h4 className="font-bold text-large">Frontend Radio</h4>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <Image
              alt="Card background"
              className="object-cover rounded-xl"
              src={customer?.imageUrl}
              width={270}
            />
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
