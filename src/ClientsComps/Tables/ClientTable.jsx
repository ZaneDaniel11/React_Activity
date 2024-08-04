import React from "react";
import ClientTableRow from "./ClientTableRow";

const ClientTable = ({
  clients,
  loading,
  setCurrentItem,
  openUpdateModal,
  openDeleteModal,
  setUsers,
}) => {
  const [search, setSearch] = React.useState("");
  const filteredClients = clients.filter((client) =>
    client.clientName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="overflow-x-auto w-full max-w-4xl">
      <input
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        placeholder="Search Users"
        className="px-4 py-2 border rounded-lg w-full mb-4"
      />
      <table className="min-w-full divide-y divide-gray-200 border">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Residency
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td
                colSpan="3"
                className="px-6 py-4 whitespace-nowrap text-center"
              >
                Loading...
              </td>
            </tr>
          ) : (
            filteredClients.map((item) => (
              <ClientTableRow
                key={item.id}
                item={item}
                setCurrentItem={setCurrentItem}
                openUpdateModal={openUpdateModal}
                openDeleteModal={openDeleteModal}
                setUsers={setUsers}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ClientTable;
