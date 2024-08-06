import React, { useEffect, useState } from "react";
import AddModal from "./ClientsComps/AddModal";
import UpdateModal from "./ClientsComps/UpdateModa";
import DeleteModal from "./ClientsComps/DeleteModal";
import ClientTable from "./ClientsComps/Tables/ClientTable";
import { fetchData } from "./Utilities/apiUtils";

export default function Client() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentItem, setCurrentItem] = useState(null);
  const [modals, setModals] = useState({
    add: false,
    update: false,
    delete: false,
  });
  const [users, setUsers] = useState({ Name: "", Residency: "" });

  const apiBaseUrl = "http://localhost:5169/api/ClientApi";

  async function addUsers(e) {
    e.preventDefault();
    await fetchData(`${apiBaseUrl}/SaveClient`, "POST", {
      id: 0,
      clientName: users.Name,
      address: users.Residency,
    });
    toggleModal("add");
    getClients();
  }

  async function updateUsers(e) {
    e.preventDefault();
    try {
      await fetchData(
        `${apiBaseUrl}/UpdateClient?Id=${currentItem.id}`,
        "PUT",
        {
          id: currentItem.id,
          clientName: users.Name,
          address: users.Residency,
        }
      );
      getClients();
      toggleModal("update");
    } catch (error) {
      console.error("Failed to update user:", error);
      alert("Failed to update user. Please try again.");
    }
  }

  function toggleModal(modalType) {
    if (modalType === "add") {
      setUsers({ Name: "", Residency: "" }); // Clear inputs when opening the AddModal
    }
    setModals((prevModals) => ({
      ...prevModals,
      [modalType]: !prevModals[modalType],
    }));
  }

  const getClients = async () => {
    setLoading(true);
    try {
      const result = await fetchData(`${apiBaseUrl}/GetClients`, "GET");
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
        const response = await fetchData(
          `${apiBaseUrl}/DeleteClient?id=${currentItem.id}`,
          "DELETE"
        );
        console.log("Delete response:", response);
        getClients();
        toggleModal("delete");
      } catch (error) {
        console.error("Failed to delete user:", error);
        alert(`Failed to delete user. Error: ${error.message}`);
      }
    } else {
      console.error("No current item to delete.");
      alert("No user selected for deletion.");
    }
  };

  useEffect(() => {
    getClients();
  }, []);

  return (
    <div className="p-6 flex flex-col items-center gap-6">
      <div className="flex justify-between w-full max-w-4xl">
        <button
          onClick={() => toggleModal("add")}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
        >
          Add User
        </button>
      </div>
      <ClientTable
        clients={clients}
        loading={loading}
        setCurrentItem={setCurrentItem}
        openUpdateModal={() => toggleModal("update")}
        openDeleteModal={() => toggleModal("delete")}
        setUsers={setUsers}
      />
      <AddModal
        isOpen={modals.add}
        toggleModal={() => toggleModal("add")}
        users={users}
        setUsers={setUsers}
        addUsers={addUsers}
      />
      <UpdateModal
        isOpen={modals.update}
        toggleModal={() => toggleModal("update")}
        users={users}
        setUsers={setUsers}
        updateUsers={updateUsers}
      />
      <DeleteModal
        isOpen={modals.delete}
        toggleModal={() => toggleModal("delete")}
        handleDeleteUser={handleDeleteUser}
      />
    </div>
  );
}
