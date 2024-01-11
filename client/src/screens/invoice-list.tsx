import InvoiceList from "../components/invoice-list"
import LoadingSpinner from "../components/loading-spinner"
import { useGetAllInvoicesQuery } from "../redux/api"

function InvoiceListScreen() {
  const { data, error, isLoading } = useGetAllInvoicesQuery()

  if (error) {
    return (
      <span className="text-extrabold text-xl text-red">
        Ooops there's been an error
      </span>
    )
  }
  if (isLoading) {
    return (
      <div className="w-6 h-6">
        <LoadingSpinner />
      </div>
    )
  }
  return (
    <div className="h-full flex items-center">
      <InvoiceList data={data ?? []} />
    </div>
  )
}

export default InvoiceListScreen
