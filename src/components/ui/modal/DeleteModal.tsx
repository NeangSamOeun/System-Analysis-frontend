import { Modal } from ".";
import Button from "../button/Button";


interface DeleteModalProps {
  isOpen: boolean;
  closeModal: () => void;
  studentCode?: string;
  onConfirm: () => void;
}

const DeleteStudentModal: React.FC<DeleteModalProps> = ({
  isOpen,
  closeModal,
  studentCode,
  onConfirm,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[500px] m-4">
      <div className="relative w-full max-w-[500px] rounded-3xl p-6 dark:bg-gray-900">
        {/* Title */}
        <div className="px-2 pr-6">
          <h4 className="mb-3 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Delete Student
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            Are you sure you want to delete student{" "}
            <span className="font-semibold text-red-600">{studentCode}</span>?  
            This action cannot be undone.
          </p>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center gap-3 px-2 mt-8 justify-end">
          <Button size="sm" variant="outline" onClick={closeModal}>
            Cancel
          </Button>

          <Button
            size="sm"
            className="bg-red-500 hover:bg-red-600 text-white"
            onClick={onConfirm}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteStudentModal;
