import React, { FC } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Textarea } from '@nextui-org/react'
import { IModal } from '@interface/components/modal/modal.interface'

const ModalDar: FC<IModal> = (props) => {
  return (
    <div className="flex flex-col gap-2">
      <Modal
        isOpen={props.isOpen}
        placement='bottom-center'
        onOpenChange={props.onOpenChange}
        backdrop='blur'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Crear post</ModalHeader>
              <ModalBody>
                <Textarea
                  label="Description"
                  labelPlacement="outside"
                  placeholder="Enter your description"
                  className="w-full"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default ModalDar
