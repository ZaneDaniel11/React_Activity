import { useEffect, useState } from "react";
import axios from "axios";

export default function Client() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentItem, setCurrentItem] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [AddModalOpen, SetAddOpenModal] = useState(false);

  const [users, SetUsers] = useState({ Name: "", Residency: "" });

  async function Addusers(e) {
    e.preventDefault();

    const response = await fetch(
      "http://localhost:5169/api/ClientApi/SaveClient",

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: 0,
          clientName: users.Name,
          address: users.Residency,
        }),
      }
    );
    OpenAddModal();
  }
  //  function CloseModal() {
  //   SetAddOpenModal(!AddModalOpen);
  // }
  function OpenAddModal() {
    SetAddOpenModal(!AddModalOpen);
  }

  const openDeleteModal = () => setDeleteModalOpen(!deleteModalOpen);

  const GetClients = async () => {
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
        await axios.delete(`http://localhost:5169/api/ClientApi/DeleteClient`, {
          params: { id: currentItem.id },
        });
        setClients(clients.filter((client) => client.id !== currentItem.id));
        openDeleteModal();
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    }
  };

  useEffect(() => {
    GetClients();
  }, []);

  return (
    <>
      <div>
        <button onClick={OpenAddModal}>Add</button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <tbody>
            {clients.map((c) => (
              <tr key={c.id}>
                <td>{c.clientName}</td>
                <td>{c.address}</td>
                <td>
                  <button
                    onClick={() => {
                      setCurrentItem(c);
                      openDeleteModal();
                    }}
                    type="button"
                    className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-3 py-1.5 me-2 mb-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
                className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-4 py-2"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {AddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full mx-4 md:mx-0">
            <div className="flex justify-between items-center">
              <h5 className="text-lg font-semibold">Add Madafaking users</h5>
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <form action="">
              <input
                type="text"
                onChange={(e) => SetUsers({ ...users, Name: e.target.value })}
                value={users.Name}
              />
              <input
                type="text"
                onChange={(e) =>
                  SetUsers({ ...users, Residency: e.target.value })
                }
                value={users.Residency}
              />

              <button onClick={(e) => Addusers(e)}>Add Users</button>
            </form>
            <div className="flex justify-end mt-4">
              <button
                className="text-gray-500 hover:text-gray-700 mr-4"
                onClick={OpenAddModal}
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
