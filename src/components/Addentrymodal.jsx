import { useState, useEffect } from "react";

const AddEntryModal = ({ onEntryAdded }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasTodayEntry, setHasTodayEntry] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (isModalOpen) {
      const entries = JSON.parse(localStorage.getItem("Entries")) || [];
      const alreadyExists = entries.some((entry) => entry.date === date);
      setHasTodayEntry(alreadyExists);
    }
  }, [isModalOpen, date]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !date || !imageUrl || !content) {
      alert("Please fill in all fields");
      return;
    }

    const newEntry = { title, date, imageUrl, content };
    const existingEntries = JSON.parse(localStorage.getItem("Entries")) || [];

    if (existingEntries.some((entry) => entry.date === date)) {
      alert("You already added an entry for this date.");
      return;
    }

    existingEntries.push(newEntry);
    localStorage.setItem("Entries", JSON.stringify(existingEntries));

    setTitle("");
    setDate(new Date().toISOString().split("T")[0]);
    setImageUrl("");
    setContent("");
    setIsModalOpen(false);
    onEntryAdded();
  };

  return (
    <div className="p-6 bg-white">
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-300 text-blue-900 px-4 py-2 rounded hover:bg-white w-full font-bold text-lg"
      >
        Add New Diary
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative">
            <button
              className="absolute top-2 right-3 text-2xl text-gray-600 hover:text-black"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>

            {hasTodayEntry && (
              <p className="text-red-600 text-center font-medium mb-2">
                You've already submitted an entry for this date. Try another
                date.
              </p>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-4 mt-2 bg-white p-6 rounded-xl shadow-md max-w-md max-auto"
            >
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">
                  Title:
                </label>
                <input
                  type="text"
                  placeholder="Title"
                  className="w-full border p-2 rounded-md text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">
                  Date:
                </label>
                <input
                  type="date"
                  className="w-full border p-2 rounded-md text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">
                  Image:
                </label>
                <input
                  type="url"
                  placeholder="Image URL"
                  className="w-full border p-2 rounded-md text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">
                  Content:
                </label>
                <textarea
                  placeholder="Content"
                  className="w-full border p-2 rounded-md text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  rows="4"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={hasTodayEntry}
                className={`w-full py-2 rounded-md transition ${
                  hasTodayEntry
                    ? "bg-gray-400 cursor-not-allowed text-white"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                Submit Entry
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddEntryModal;
