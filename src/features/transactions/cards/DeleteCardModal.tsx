import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Spinner,
} from "@nextui-org/react";

import { useDeleteCard } from "../../../hooks/cardHooks/useDeleteCard";

export default function DeleteCardModal({
  documentId,
  isOpen2,
  onOpenChange2,
}: {
  documentId: string;
  isOpen2: boolean;
  onOpenChange2: () => void;
}) {
  const { deleteCard, isCardDeleting } = useDeleteCard();

  function handleDelete() {
    if (!documentId) return;

    deleteCard(documentId);
  }
  return (
    <>
      <Modal isOpen={isOpen2} onOpenChange={onOpenChange2} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-primary-500">
                <span className="font-bold text-red-500 text-base">
                  Are you sure you want to delete your card?
                </span>
              </ModalHeader>
              <ModalBody>
                <span className="text-red-500 font-medium text-sm">
                  Are you sure you want to delete your bank card from our
                  database? Once you delete it, it will be impossible to restore
                  it. You will need to create a new one for this.
                </span>
              </ModalBody>
              <ModalFooter>
                <Button
                  type="button"
                  color="default"
                  variant="ghost"
                  onPress={onClose}
                >
                  Close
                </Button>
                <Button
                  disabled={isCardDeleting}
                  type="submit"
                  variant="ghost"
                  color="danger"
                  onPress={() => {
                    handleDelete();
                    return onClose();
                  }}
                >
                  {isCardDeleting ? <Spinner /> : "Delete"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
