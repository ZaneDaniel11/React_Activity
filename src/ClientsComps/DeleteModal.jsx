// DeleteModal.js
import React from "react";

export default function DeleteModal({ isOpen, toggleModal, handleDeleteUser }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full mx-4 md:mx-0">
        <div className="flex justify-between items-center">
          <h5 className="text-lg font-semibold">Delete Confirmation</h5>
          <button
            type="button"
            onClick={toggleModal}
            className="text-gray-500 hover:text-gray-700"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <p className="mt-4">Are you sure you want to delete this user?</p>
        <div className="flex justify-end mt-4">
          <button
            onClick={toggleModal}
            className="text-gray-500 hover:text-gray-700 mr-4"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteUser}
            className="text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-4 py-2"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
