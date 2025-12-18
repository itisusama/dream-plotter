import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ModalContent } from "./ModalContent"
import { DialogTitle } from "@radix-ui/react-dialog"

interface ModalProps {
  modalKey: string
  openKey: string | null
  setOpenKey: (key: string | null) => void
}

export function Modal({ modalKey, openKey, setOpenKey }: ModalProps) {
  const isOpen = openKey === modalKey
  const content = ModalContent[modalKey] || <p>No content found.</p>

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setOpenKey(open ? modalKey : null)}>
      <DialogTitle className="hidden">{modalKey}</DialogTitle>
      <DialogContent className="sm:max-w-[425px]">{content}</DialogContent>
    </Dialog>
  )
}