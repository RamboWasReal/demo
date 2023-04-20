import { EventApiResponse } from "@/interface/api"
import { truncateString } from "@/lib/helper"
import { QueryClient, dehydrate, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { format } from "date-fns"

export default function Index() {
  const {
    data: eventsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["events"],
    queryFn: () => axios.get("http://127.0.0.1:8000/api/events").then((res) => res.data),
  })

  return (
    <main className="bg-[#1e293b] flex justify-center items-center min-h-screen">
      <div className="justify-center items-center mx-auto">
        <h1 className="text-center text-xl">Event List</h1>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="mt-8 flow-root mx-auto">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-100 sm:pl-0">
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-slate-100">
                        Description
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-slate-100">
                        Start at
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-slate-100">
                        End at
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {(eventsData?.data ?? []).map((event: EventApiResponse) => (
                      <tr key={event.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-slate-100 sm:pl-0">
                          {event.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {truncateString(event.description, 30)}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {format(new Date(event.start_at), "yyyy-MM-dd HH:mm")}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {format(new Date(event.end_at), "yyyy-MM-dd HH:mm")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
