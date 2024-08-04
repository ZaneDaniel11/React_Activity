import React, { useEffect, useState } from "react";
import AddModal from "./ClientsComps/AddModal";
import UpdateModal from "./ClientsComps/UpdateModa";
import DeleteModal from "./ClientsComps/DeleteModal";
import ClientTable from "./ClientsComps/Tables/ClientTable";

export default function Client() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentItem, setCurrentItem] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [users, setUsers] = useState({ Name: "", Residency: "" });

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
        <button
          onClick={openAddModal}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
        >
          Add User
        </button>
      </div>
      <ClientTable
        clients={clients}
        loading={loading}
        setCurrentItem={setCurrentItem}
        openUpdateModal={openUpdateModal}
        openDeleteModal={openDeleteModal}
        setUsers={setUsers}
      />
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
