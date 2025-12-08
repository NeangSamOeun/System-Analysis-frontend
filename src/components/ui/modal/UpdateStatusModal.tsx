import React, { useState } from "react";
import { Modal } from ".";
import Button from "../button/Button";
import Label from "../../form/Label";
import Select from "../../form/Select";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentStatus: string;
  onConfirm: (newStatus: string) => void;
}

export default function UpdateStatusModal({
  isOpen,
  onClose,
  currentStatus,
  onConfirm,
}: Props) {
  const [status, setStatus] = useState(currentStatus);

  const handleSubmit = () => {
    onConfirm(status);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[420px] m-4">
      <div className="w-full max-w-[420px] rounded-3xl p-6">

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-5">
          Update Status
        </h2>

        {/* Select Label */}
        <Label className="block mb-2 text-gray-700 dark:text-gray-300 font-medium">
          Select Status
        </Label>

        {/* Dropdown */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800text-gray-900 dark:text-gray-200 border border-gray-300 dark:border-gray-700
            focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600
            focus:outline-none cursor-pointer
          ">
          <option value="Pending">Pending</option>
          <option value="Active">Active</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-8">
          <Button
            className="rounded-xl px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200"
            onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="rounded-xl px-4 py-2 bg-green-500 hover:bg-green-600 text-white shadow-md"
            onClick={handleSubmit}>
            Save
          </Button>
        </div>
      </div>
</Modal>
  );
}
