"use client";
import { Dialog } from "@headlessui/react";
import { useState } from "react";

function Test() {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <Dialog.Overlay />

        <Dialog.Title>Modal Title</Dialog.Title>
        <Dialog.Description>
          This is an example modal dialog.
        </Dialog.Description>

        {/* Content for your modal */}
      </Dialog>
    </>
  );
}

export default Test;
