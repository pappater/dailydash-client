import React from "react";
import useStore from "../../store/store";

const ManageWidgets: React.FC = () => {
  const { isDarkMode, setShowModal } = useStore();

  return (
    <button
      onClick={() => setShowModal(true)}
      className={`px-4 py-2 rounded-lg font-semibold transition duration-150 ease-in-out ${
        isDarkMode
          ? "text-neutral-300 hover:bg-neutral-800"
          : "text-neutral-800 hover:bg-neutral-200"
      }`}
    >
      Manage Widgets
    </button>
  );
};

export default ManageWidgets;
