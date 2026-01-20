export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full text-black">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-2xl">&times;</button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}