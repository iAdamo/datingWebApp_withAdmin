// components/SearchFilterModal.jsx
const SearchFilterModal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500 text-xl">&times;</button>
        </div>
        <div>{children}</div>
        <div className="flex justify-end mt-4 gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-200 text-gray-800">Cancel</button>
          <button className="px-4 py-2 rounded bg-purple-600 text-white">Apply</button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilterModal;
