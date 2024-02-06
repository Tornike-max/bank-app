import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Spinner,
} from "@nextui-org/react";
import { useUpdateCard } from "../../../hooks/cardHooks/useUpdateCard";
import { SubmitHandler, useForm } from "react-hook-form";
import { HiOutlineCreditCard, HiOutlineUser } from "react-icons/hi2";

type UpdateCard = {
  cardName: string;
  userName: string;
};

export default function UpdateCardModal({
  documentId,
  isOpen,
  onOpenChange,
}: {
  documentId: string;
  isOpen: boolean;
  onOpenChange: () => void;
}) {
  const { updateCardMutation, isUpdating } = useUpdateCard();
  const { register, handleSubmit } = useForm<UpdateCard>();

  const onSubmit: SubmitHandler<UpdateCard> = async (data) => {
    if (!data.cardName || !data.userName) return;
    console.log(data);
    const update = await updateCardMutation({
      documentId: documentId,
      userName: data.userName,
      cardName: data.cardName,
    });

    if (!update) throw Error();
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader className="flex flex-col gap-1 text-primary-500">
                Update
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Card Name"
                  color="primary"
                  placeholder="Enter Your Card Name"
                  endContent={
                    <HiOutlineCreditCard className="text-primary-500 text-xl" />
                  }
                  variant="bordered"
                  {...register("cardName")}
                />
                <Input
                  placeholder="Enter User Name"
                  label="User Name"
                  color="primary"
                  variant="bordered"
                  endContent={
                    <HiOutlineUser className="text-primary-500 text-xl" />
                  }
                  {...register("userName")}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  type="button"
                  color="danger"
                  variant="ghost"
                  onPress={onClose}
                >
                  Close
                </Button>
                <Button
                  disabled={isUpdating}
                  type="submit"
                  variant="ghost"
                  color="primary"
                  onPress={onClose}
                >
                  {isUpdating ? <Spinner /> : "Update"}
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
