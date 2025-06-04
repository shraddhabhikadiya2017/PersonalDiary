import { useState } from "react";
import AddEntryModal from "./components/Addentrymodal";
import DiaryList from "./pages/DiaryList";

const App = () => {
  const [refreshFlag, setRefreshFlag] = useState(0);

  const refreshEntries = () => {
    setRefreshFlag((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-800">
        My Diary Entries
      </h1>
      <AddEntryModal onEntryAdded={refreshEntries} />
      <DiaryList
        refreshFlag={refreshFlag}
        onRemove={() => setRefreshFlag((flag) => !flag)}
      />
    </div>
  );
};

export default App;
