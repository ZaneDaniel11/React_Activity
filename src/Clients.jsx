import { useEffect, useState } from "react";

export default function Client() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentItem, setCurrentItem] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [users, setUsers] = useState({ Name: "", Residency: "" });
  const [search, setSearch] = useState("");

  const FilterdUsers = clients.filter((clients) =>
    clients.clientName.toLowerCase().includes(search.toLowerCase())
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
      }
    }
  };

  useEffect(() => {
    getClients();
  }, []);

  return (
    <>
      <div className="p-4">
        <button
          onClick={openAddModal}
          className="text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm px-4 py-2"
        >
          Add
        </button>
        <input value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="flex justify-center overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Residency
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {FilterdUsers.map((c) => (
                <tr key={c.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {c.clientName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {c.address}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-2">
                    <button
                      onClick={() => {
                        setCurrentItem(c);
                        setUsers({ Name: c.clientName, Residency: c.address });
                        openUpdateModal();
                      }}
                      type="button"
                      className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-3 py-1.5"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => {
                        setCurrentItem(c);
                        openDeleteModal();
                      }}
                      type="button"
                      className="text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-3 py-1.5"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full mx-4 md:mx-0">
            <div className="flex justify-between items-center">
              <h5 className="text-lg font-semibold">Delete Confirmation</h5>
              <button
                type="button"
                onClick={openDeleteModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <p className="mt-4">Are you sure you want to delete this user?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={openDeleteModal}
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
      )}

      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full mx-4 md:mx-0">
            <div className="flex justify-between items-center">
              <h5 className="text-lg font-semibold">Add User</h5>
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700"
                onClick={openAddModal}
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
                onClick={(e) => addUsers(e)}
                className="mt-4 text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm px-4 py-2"
              >
                Add User
              </button>
            </form>
            <div className="flex justify-end mt-4">
              <button
                className="text-gray-500 hover:text-gray-700 mr-4"
                onClick={openAddModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {updateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full mx-4 md:mx-0">
            <div className="flex justify-between items-center">
              <h5 className="text-lg font-semibold">Update User</h5>
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700"
                onClick={openUpdateModal}
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
                onClick={(e) => updateUsers(e)}
                className="mt-4 text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm px-4 py-2"
              >
                Update User
              </button>
            </form>
            <div className="flex justify-end mt-4">
              <button
                className="text-gray-500 hover:text-gray-700 mr-4"
                onClick={openUpdateModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
