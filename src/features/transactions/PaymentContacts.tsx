import { Models } from "appwrite";
import { SiMinutemailer } from "react-icons/si";
import { useNavigate } from "react-router-dom";

export default function PaymentContacts({
  contact,
}: {
  contact: Models.Document;
}) {
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col justify-start items-center border-b border-gray-300 py-2">
      <div className="w-full flex justify-between items-center">
        <div className="flex justify-center items-center gap-2 cursor-pointer ">
          <img
            src={contact.imageUrl}
            className="w-10 h-10 sm:w-14 sm:h-14 rounded-full object-cover shadow-lg"
            alt="Customer-image"
          />
          <span className="text-xs sm:text-lg font-semibold hover:underline">
            {contact.name}
          </span>
        </div>
        <div className="flex justify-center items-center gap-2">
          <div className="h-6 border-1 border-gray-300"></div>
          <SiMinutemailer
            onClick={() => navigate("/transactions/transfer")}
            className="text-primary-500 bg-primary-100 w-10 h-10 py-2 px-2 rounded-full cursor-pointer hover:bg-blue-100 hover:text-primary-600 duration-150 transition-all"
          />
        </div>
      </div>
    </div>
  );
}
