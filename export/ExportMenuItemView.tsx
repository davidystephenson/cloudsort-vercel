import ExportIconView from '@/export/ExportIconView'
import privateListContext from '@/list/private-list-context'
import ThemeButtonView from '@/theme/theme-button-view'
import { MenuItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Table, Tbody, Td, Tr, useDisclosure } from '@chakra-ui/react'

export default function ExportMenuItemView (): JSX.Element {
  const privateList = privateListContext.useContext()
  const { isOpen, onOpen, onClose } = useDisclosure()
  function handleExport (): void {
    onOpen()
  }
  function handleExportCriticker (): void {
    privateList.exportCriticker()
  }
  function handleExportHistory (): void {
    privateList.exportHistory()
  }
  function handleExportRanking (): void {
    privateList.exportRanking()
  }
  return (
    <>
      <MenuItem
        icon={<ExportIconView />}
        onClick={handleExport}
      >
        Export
      </MenuItem>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Export</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Table size='xs' variant='striped'>
              <Tbody>
                <Tr>
                  <Td w='0'>Criticker</Td>
                  <Td>
                    <ThemeButtonView
                      onClick={handleExportCriticker}
                      size='xs'
                    >
                      CSV
                    </ThemeButtonView>
                  </Td>
                </Tr>
                <Tr>
                  <Td w='0'>History</Td>
                  <Td>
                    <ThemeButtonView
                      onClick={handleExportHistory}
                      size='xs'
                    >
                      JSON
                    </ThemeButtonView>
                  </Td>
                </Tr>
                <Tr>
                  <Td w='0' pr='4px'>Ranking</Td>
                  <Td>
                    <ThemeButtonView
                      onClick={handleExportRanking}
                      size='xs'
                    >
                      CSV
                    </ThemeButtonView>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
