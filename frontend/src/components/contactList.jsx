import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch contacts from backend
  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("You must be logged in");

      const res = await fetch("https://hospital-management-system-9rt1.onrender.com/api/contact", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch contacts");

      const data = await res.json();
      setContacts(data);
    } catch (error) {
      console.error(error);
      toast.error(error.message, { position: "bottom-left" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Delete contact with toast confirmation
  const handleDelete = (id) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <p className="font-medium">Are you sure you want to delete this contact?</p>
          <div className="flex justify-end gap-2">
            <button
              onClick={async () => {
                toast.dismiss(t.id); // remove the toast
                try {
                  const token = localStorage.getItem("token");
                  const res = await fetch(`https://hospital-management-system-9rt1.onrender.com/api/contact/${id}`, {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                  });
                  if (!res.ok) throw new Error("Failed to delete contact");

                  toast.success("Contact deleted successfully!");
                  setContacts(contacts.filter((contact) => contact._id !== id));
                } catch (error) {
                  console.error(error);
                  toast.error(error.message, { position: "bottom-left" });
                }
              }}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Yes
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="bg-gray-300 text-gray-800 px-3 py-1 rounded hover:bg-gray-400 transition"
            >
              No
            </button>
          </div>
        </div>
      ),
      { duration: Infinity } // keep toast visible until user clicks
    );
  };

  return (
    <section className="py-20 px-6 max-w-6xl mx-auto">
      <Toaster />
      <h2 className="text-3xl font-bold text-center mb-8">📬 Contact Messages</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading contacts...</p>
      ) : contacts.length === 0 ? (
        <p className="text-center text-gray-500">No messages yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contacts.map((contact) => (
            <div
              key={contact._id}
              className="bg-white shadow-lg rounded-xl p-6 border hover:shadow-2xl transition relative"
            >
              <h3 className="text-lg font-semibold text-blue-600">{contact.name}</h3>
              <p className="text-gray-500 text-sm">{contact.email}</p>
              <p className="mt-2 text-gray-800 font-medium">Subject: {contact.subject}</p>
              <p className="mt-2 text-gray-700">{contact.message}</p>
              <p className="mt-4 text-sm text-gray-400">
                Sent: {new Date(contact.createdAt).toLocaleString()}
              </p>

              {/* Delete Button */}
              <button
                onClick={() => handleDelete(contact._id)}
                className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ContactList;
