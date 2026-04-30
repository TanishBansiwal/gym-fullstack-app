import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function Admin() {
  const [contacts, setContacts] = useState([]);

  const chartData = [
  {
    name: "Contacts",
    count: contacts.length
  }
];

  const [editingId, setEditingId] = useState(null);
const [editData, setEditData] = useState({ name: "", email: "" });

  useEffect(() => {
    fetch("https://gym-backend-od89.onrender.com/contacts" , {
  headers: {
  "Content-Type": "application/json",
  Authorization: localStorage.getItem("token")
}
})
      .then(res => res.json())
      .then(data => setContacts(data));
  }, []);

  const handleDelete = async (id) => {
  await fetch(`https://gym-backend-od89.onrender.com/contacts/${id}`,  {
 headers: {
  "Content-Type": "application/json",
  Authorization: localStorage.getItem("token")
}
}, {
    method: "DELETE"
  });

  // remove from UI
  setContacts(contacts.filter(c => c._id !== id));
};

const startEdit = (contact) => {
  setEditingId(contact._id);
  setEditData({ name: contact.name, email: contact.email });
};

const handleUpdate = async (id) => {
    console.log("Updating:", editData);
  try {
    const res = await fetch(`https://gym-backend-od89.onrender.com/contacts/${id}` , {
  headers: {
  "Content-Type": "application/json",
  Authorization: localStorage.getItem("token")
}
}, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editData)
    });

    const result = await res.json();
    console.log(result);

    // refresh data AFTER update
    const updatedRes = await fetch("https://gym-backend-od89.onrender.com/contacts" , {
  headers: {
  "Content-Type": "application/json",
  Authorization: localStorage.getItem("token")
}
});
    const updatedData = await updatedRes.json();

    setContacts(updatedData);
    setEditingId(null);

  } catch (error) {
    console.error(error);
  }
};

  return (
  <div className="min-h-screen bg-black text-white p-10">

    <h1 className="text-3xl font-bold mb-8 text-center">
      Admin Dashboard
    </h1>


    <div className="bg-gray-900 p-6 rounded-xl mb-6">
  <h2 className="text-xl mb-4">Dashboard</h2>

  <BarChart width={300} height={200} data={chartData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Bar dataKey="count" fill="#ef4444" />
  </BarChart>
</div>


    {contacts.length === 0 ? (
      <p className="text-center text-gray-400">No contacts yet</p>
    ) : (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {contacts.map((c) => (
          <div
            key={c._id}
            className="bg-gray-800 p-5 rounded-xl shadow-lg hover:scale-105 transition"
          >

            {editingId === c._id ? (
              <>
                <input
                  className="p-2 text-black w-full mb-2 rounded"
                  value={editData.name}
                  onChange={(e) =>
                    setEditData({ ...editData, name: e.target.value })
                  }
                />

                <input
                  className="p-2 text-black w-full mb-2 rounded"
                  value={editData.email}
                  onChange={(e) =>
                    setEditData({ ...editData, email: e.target.value })
                  }
                />

                <button
                  onClick={() => handleUpdate(c._id)}
                  className="bg-green-500 px-4 py-2 rounded w-full"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <p className="mb-2"><b>Name:</b> {c.name}</p>
                <p className="mb-4"><b>Email:</b> {c.email}</p>

                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(c)}
                    className="bg-blue-500 px-3 py-1 rounded w-full"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(c._id)}
                    className="bg-red-500 px-3 py-1 rounded w-full"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}

          </div>
        ))}

      </div>
    )}

  </div>
);
}