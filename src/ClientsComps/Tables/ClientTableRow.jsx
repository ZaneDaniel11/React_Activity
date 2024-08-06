import React from "react";

const ClientTableRow = ({
  item,
  setCurrentItem,
  openUpdateModal,
  openDeleteModal,
  setUsers,
}) => (
  <tr key={item.id} className="hover:bg-gray-100">
    <td className="px-6 py-4 whitespace-nowrap">{item.clientName}</td>
    <td className="px-6 py-4 whitespace-nowrap">{item.address}</td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex gap-4">
        <button
          onClick={() => {
            setCurrentItem(item);
            setUsers({
              Name: item.clientName,
              Residency: item.address,
            });
            openUpdateModal();
          }}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
        >
          Update
        </button>
        <button
          onClick={() => {
            setCurrentItem(item);
            setUsers({
              id: item.id,
            });

            openDeleteModal();
          }}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
        >
          Delete
        </button>
      </div>
    </td>
  </tr>
);

export default ClientTableRow;
