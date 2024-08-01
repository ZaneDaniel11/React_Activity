import { useEffect, useState } from "react";
import axios from "axios";

export default function Client() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentItem, setCurrentItem] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const openDeleteModal = () => setDeleteModalOpen(true);

  const closeDeleteModal = () => setDeleteModalOpen(false);

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

  useEffect(() => {
    GetClients();
  }, []);

  const handleDeleteUser = async () => {
    if (currentItem && currentItem.id) {
      try {
        await axios.delete(`http://localhost:5169/api/ClientApi/DeleteClient`, {
          params: { id: currentItem.id },
        });
        setClients(clients.filter((client) => client.id !== currentItem.id));
        closeDeleteModal();
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    }
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <tbody>
            {clients.map((c) => (
              <tr key={c.id}>
                <td>{c.clientName}</td>
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
                onClick={closeDeleteModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <p className="mt-4">Are you sure you want to delete this user?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={closeDeleteModal}
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
    </>
  );
}
