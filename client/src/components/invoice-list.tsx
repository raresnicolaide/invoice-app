import { IInvoiceResponse } from "../redux/api"
import Invoice from "./invoice"
import { Modal, ModalContents, ModalOpenButton } from "./modal"

interface InvoiceListProps {
  data: IInvoiceResponse[]
}

function InvoiceList({ data }: InvoiceListProps) {
  return (
    <table className="min-w-full border border-gray-300">
      <thead className="bg-gray-200">
        <tr>
          <th className="py-2 px-4 border-b">Date</th>
          <th className="py-2 px-4 border-b">Description</th>
          <th className="py-2 px-4 border-b">Payee</th>
          <th className="py-2 px-4 border-b">Due Date</th>
          <th className="py-2 px-4 border-b">Spent</th>
          <th className="py-2 px-4 border-b"></th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td className="text-center py-2 px-4 border-b">
              {new Date(item.created_at).toLocaleString("en-US", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
              })}
            </td>
            <td className="text-center py-2 px-4 border-b">
              {item.description}
            </td>
            <td className="text-center py-2 min-w-28 px-4 border-b">
              {item.user.name}
            </td>
            <td className="text-center py-2 px-4 border-b">
              {new Date(item.due_date).toLocaleString("en-US", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
              })}
            </td>
            <td className="text-center py-2 px-4 border-b">${item.amount}</td>
            <td className="text-center py-2 px-4 border-b">
              <Modal>
                <ModalOpenButton
                  renderButton={(setIsOpen) => (
                    <button
                      className="bg-indigo-700 text-white text-sm p-1 border-0 rounded-md"
                      onClick={setIsOpen}
                    >
                      Show
                    </button>
                  )}
                />
                <ModalContents title={`Invoice #${item.id}`}>
                  <Invoice invoiceId={item.id} />
                </ModalContents>
              </Modal>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default InvoiceList
