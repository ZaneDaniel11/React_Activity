// UpdateModal.js
import React from "react";

export default function UpdateModal({
  isOpen,
  toggleModal,
  users,
  setUsers,
  updateUsers,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full mx-4 md:mx-0">
        <div className="flex justify-between items-center">
          <h5 className="text-lg font-semibold">Update User</h5>
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700"
            onClick={toggleModal}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <form>
          <div className="mt-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              onChange={(e) => setUsers({ ...users, Name: e.target.value })}
              value={users.Name}
              className="w-full p-2 border border-gray-300 rounded-lg mt-2"
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700">Residency</label>
            <input
              type="text"
              onChange={(e) =>
                setUsers({ ...users, Residency: e.target.value })
              }
              value={users.Residency}
              className="w-full p-2 border border-gray-300 rounded-lg mt-2"
            />
          </div>
          <button
            onClick={updateUsers}
            className="mt-4 text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm px-4 py-2"
          >
            Update User
          </button>
        </form>
        <div className="flex justify-end mt-4">
          <button
            className="text-gray-500 hover:text-gray-700 mr-4"
            onClick={toggleModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
