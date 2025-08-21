import ReactDOM from "react-dom"
export default function Modal({ children, onClose }) {
    return ReactDOM.createPortal(
        <div className="fixed inset-0 bg-black/50
        flex items-center justify-center z-50 "> {/* overlay */}
            <div className="bg-white rounded-lg shadow-lg relative">
                <button onClick={onClose} className="absolute top-1 right-2 hover:bg-gray-100 text-gray-500">
                    ✕
                </button>
                <div className="p-6">
                    {children}
                </div>

            </div>
        </div>,
        document.getElementById("modal-root")
    )
}