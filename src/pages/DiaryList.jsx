import { useEffect, useState } from "react";

const DiaryList = ({ refreshFlag, onRemove }) => {
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);

  useEffect(() => {
    const storedEntries = JSON.parse(localStorage.getItem("Entries")) || [];

    const sortedEntries = storedEntries.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    setEntries(sortedEntries);
  }, [refreshFlag]);

  const handleRemove = (date) => {
    const updatedEntries = entries.filter((entry) => entry.date !== date);
    localStorage.setItem("Entries", JSON.stringify(updatedEntries));
    setEntries(updatedEntries);
    if (onRemove) onRemove();
    if (selectedEntry?.date === date) setSelectedEntry(null);
  };

  return (
    <div className="mt-10 px-4 max-w-7xl mx-auto">
      {entries.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No diary entries yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {entries.map((entry, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-lg font-semibold text-blue-900 mb-1">
                  {entry.title}
                </h2>
                <p className="text-xs text-gray-500 mb-2">{entry.date}</p>
                {entry.imageUrl && (
                  <img
                    src={entry.imageUrl}
                    alt={entry.title}
                    className="w-full h-40 object-cover rounded-md border mb-3"
                  />
                )}
                <p className="text-sm text-gray-700 line-clamp-3">
                  {entry.content}
                </p>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <button
                  onClick={() => setSelectedEntry(entry)}
                  className="text-sm bg-blue-200 text-blue-800 px-3 py-1 rounded hover:bg-blue-300 transition cursor-pointer"
                >
                  Read More
                </button>

                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this diary entry?"
                      )
                    ) {
                      handleRemove(entry.date);
                    }
                  }}
                  className="text-sm bg-red-200 text-red-800 px-3 py-1 rounded hover:bg-red-300 transition cursor-pointer"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedEntry && (
        <div
          className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.20)" }}
        >
          <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full p-6 relative max-h-[90vh] flex flex-col">
            <button
              onClick={() => setSelectedEntry(null)}
              className="absolute top-2 right-3 text-3xl font-bold text-gray-600 hover:text-black cursor-pointer"
            >
              &times;
            </button>

            <div className="overflow-auto flex-grow">
              <h2 className="text-2xl font-bold text-blue-800 mb-2">
                {selectedEntry.title}
              </h2>
              <p className="text-sm text-gray-500 italic mb-4">
                {selectedEntry.date}
              </p>

              {selectedEntry.imageUrl && (
                <img
                  src={selectedEntry.imageUrl}
                  alt={selectedEntry.title}
                  className="w-full h-64 object-cover rounded-lg border mb-4"
                />
              )}

              <div className="bg-gray-50 border border-gray-200 rounded-md p-4 text-gray-800 whitespace-pre-wrap">
                {selectedEntry.content}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiaryList;
