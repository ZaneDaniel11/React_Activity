import React, { useEffect, useState } from "react";
import AddModal from "./ClientsModal/AddModal";
import UpdateModal from "./ClientsModal/UpdateModa";
import DeleteModal from "./ClientsModal/DeleteModal";
import "./Client.css";

export default function Client() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentItem, setCurrentItem] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [users, setUsers] = useState({ Name: "", Residency: "" });
  const [search, setSearch] = useState("");

  const FilterdUsers = clients.filter((client) =>
    client.clientName.toLowerCase().includes(search.toLowerCase())
  );

  async function addUsers(e) {
    e.preventDefault();
    await fetch("http://localhost:5169/api/ClientApi/SaveClient", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: 0,
        clientName: users.Name,
        address: users.Residency,
      }),
    });
    openAddModal();
    getClients();
  }

  async function updateUsers(e) {
    e.preventDefault();
    try {
      await fetch(
        `http://localhost:5169/api/ClientApi/UpdateClient?Id=${currentItem.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: currentItem.id,
            clientName: users.Name,
            address: users.Residency,
          }),
        }
      );
      getClients();
      openUpdateModal();
    } catch (error) {
      console.error("Failed to update user:", error);
      alert("Failed to update user. Please try again.");
    }
  }

  function openAddModal() {
    setUsers({ Name: "", Residency: "" });
    setAddModalOpen(!addModalOpen);
  }

  function openUpdateModal() {
    setUpdateModalOpen(!updateModalOpen);
  }

  const openDeleteModal = () => setDeleteModalOpen(!deleteModalOpen);

  const getClients = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:5169/api/ClientApi/GetClients",
        {
          method: "GET",
        }
      );
      const result = await response.json();
      setClients(result);
    } catch (error) {
      console.error("Failed to fetch clients:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    if (currentItem && currentItem.id) {
      try {
        await fetch(
          `http://localhost:5169/api/ClientApi/DeleteClient?id=${currentItem.id}`,
          {
            method: "DELETE",
          }
        );
        getClients();
        openDeleteModal();
      } catch (error) {
        console.error("Failed to delete user:", error);
        alert("Failed to delete user. Please try again.");
      }
    }
  };

  useEffect(() => {
    getClients();
  }, []);

  return (
    <div className="p-6 flex flex-col items-center gap-6">
      <div className="flex justify-between w-full max-w-4xl">
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder="Search Users"
          className="px-4 py-2 border rounded-lg w-1/2"
        />
        <button
          onClick={openAddModal}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
        >
          Add User
        </button>
      </div>
      <div className="overflow-x-auto w-full max-w-4xl">
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
              FilterdUsers.map((item) => (
                <tr key={item.id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.clientName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.address}
                  </td>
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
                          openDeleteModal();
                        }}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <AddModal
        isOpen={addModalOpen}
        toggleModal={openAddModal}
        users={users}
        setUsers={setUsers}
        addUsers={addUsers}
      />
      <UpdateModal
        isOpen={updateModalOpen}
        toggleModal={openUpdateModal}
        users={users}
        setUsers={setUsers}
        updateUsers={updateUsers}
      />
      <DeleteModal
        isOpen={deleteModalOpen}
        toggleModal={openDeleteModal}
        handleDeleteUser={handleDeleteUser}
      />
    </div>
  );
}
