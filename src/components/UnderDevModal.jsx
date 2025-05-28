import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const UnderDevModal = ({ isOpen, onClose }) => {
  const escHandler = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", escHandler);
    return () => document.removeEventListener("keydown", escHandler);
  }, [escHandler]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
            className="bg-gray-800 text-white rounded-xl p-6 max-w-sm w-full shadow-xl text-center relative"
          >
            <h2 className="text-2xl font-bold mb-2 text-pink-400">
              🚧 Whoops!
            </h2>
            <p className="text-sm text-gray-300">
              This feature is currently brewing ☕ <br />
              Come back later — the devs are probably sipping tea and debugging!
              🛠️😅
            </p>
            <button
              onClick={onClose}
              className="mt-4 bg-pink-500 hover:bg-pink-600 text-white cursor-pointer px-4 py-1 rounded-full text-sm"
            >
              Got it!
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UnderDevModal;
