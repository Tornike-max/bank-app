import { Button, Card, CardFooter, Image } from "@nextui-org/react";
import { Models } from "appwrite";
import { useNavigate } from "react-router-dom";

export default function Customers({
  customers,
}: {
  customers: Models.Document[] | undefined;
}) {
  const navigate = useNavigate();
  return (
    <div className="max-w-[2200px] w-full grid grid-cols-1 sm:grid-cols-2 md:py-0 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4">
      {customers?.map((customer) => (
        <Card radius="lg" className=" m-auto bg-stone-200">
          <Image
            alt="user"
            className="object-cover max-w-96 sm:max-w-80 w-full"
            src={customer.imageUrl}
          />
          <CardFooter className="justify-between bg-stone-200  border-1 py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
            <p className="text-tiny text-primary-500 font-semibold">
              {customer.name}
            </p>
            <Button
              variant="shadow"
              color="primary"
              radius="lg"
              size="sm"
              onClick={() => navigate("/transactions/transfer/")}
            >
              Transfer
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
