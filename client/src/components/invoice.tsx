import { useGetInvoiceQuery } from "../redux/api"
import LoadingSpinner from "./loading-spinner"

interface InvoiceProps {
  invoiceId: number
}
function Invoice({ invoiceId }: InvoiceProps) {
  const { data, isLoading, isError } = useGetInvoiceQuery({ invoiceId })

  if (isLoading) {
    return (
      <div className="w-6 h-6">
        <LoadingSpinner />
      </div>
    )
  }
  if (!data || isError) {
    return (
      <div className="flex w-full items-center justify-center">
        <span className="text-center font-extrabold text-xl text-red-500">
          Ooops there's been an error
        </span>
      </div>
    )
  }

  return (
    <div className="">
      <p className="font-bold">
        Date:{" "}
        <span className="font-normal">
          {new Date(data?.created_at).toLocaleDateString()}
        </span>
      </p>
      <p className="font-bold">
        Description: <span className="font-normal">{data?.description}</span>
      </p>
      <p className="font-bold">
        Payee: <span className="font-normal"> {data?.user.name}</span>
      </p>
      <p className="font-bold">
        Spent: <span className="font-normal"> ${data?.amount}</span>
      </p>
    </div>
  )
}

export default Invoice
