import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import axios from "axios"
import classNames from "classnames"
import { useRouter } from "next/router"

type FormValues = {
  name: string
  description: string
  start_at: Date | string
  end_at: Date | string
}

const eventSchema: z.ZodSchema<FormValues> = z
  .object({
    name: z.string().max(32, { message: "Must be 32 or fewer characters long" }).nonempty(),
    description: z.string().nonempty(),
    start_at: z.string(),
    end_at: z.string(),
  })
  .refine((data) => data.end_at > data.start_at, {
    message: "End date cannot be earlier than start date.",
    path: ["end_at"],
  })
  .refine((value) => new Date(value.start_at) > new Date(), {
    message: "Start date cannot be earlier than now.",
    path: ["start_at"],
  })

export default function Create() {
  const { push } = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      start_at: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
      end_at: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
    },
  })

  const onSubmit = handleSubmit((data) => {
    try {
      axios
        .post("http://localhost:8000/api/events", {
          name: data.name,
          description: data.description,
          start_at: new Date(data.start_at).toISOString(),
          end_at: new Date(data.end_at).toISOString(),
        })
        .then((res) => push("/events"))
    } catch (e) {
      console.log(e)
    }
  })

  return (
    <main className="bg-[#1e293b] flex justify-center items-center h-screen">
      <div className="justify-center items-center mx-auto">
        <h1 className="text-center text-xl">Create event</h1>
        <form
          onSubmit={onSubmit}
          className="min-w-[500px] justify-center items-center"
          id="createForm">
          <div className=" w-full px-10">
            <div className="items-center justify-center w-full">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-slate-100">
                Name
              </label>
              <div className="mt-2 ">
                <input
                  id="name"
                  required
                  className="px-2 bg-[#1e293b] w-full rounded-md border-0 py-1.5 text-slate-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register("name")}
                  placeholder="name"
                />
                {errors?.name && (
                  <p data-testid="error-name" className="text-red-900">
                    {errors.name.message}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-8">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-slate-100">
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  required
                  className="px-2 bg-[#1e293b] block w-full rounded-md border-0 py-1.5 text-slate-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register("description")}
                  placeholder="description"
                />
              </div>
            </div>
            <div className="items-center justify-between w-full mt-8 flex gap-2">
              <div>
                <label
                  htmlFor="start_at"
                  className="block text-sm font-medium leading-6 text-slate-100">
                  Start
                </label>
                <div className="mt-2">
                  <input
                    required
                    id="start_at"
                    type="datetime-local"
                    date-format="yyyy-MM-ddThh:mm"
                    className="px-2 bg-[#1e293b] w-full rounded-md border-0 py-1.5 text-slate-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...register("start_at")}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="end_at"
                  className="block text-sm font-medium leading-6 text-slate-100">
                  End
                </label>
                <div className="mt-2 ">
                  <input
                    required
                    id="end_at"
                    type="datetime-local"
                    date-format="yyyy-MM-ddThh:mm"
                    className="px-2 bg-[#1e293b] w-full rounded-md border-0 py-1.5 text-slate-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...register("end_at")}
                  />
                </div>
              </div>
            </div>
            {errors?.start_at && (
              <p
                data-testid="error-start"
                id="error-start"
                className="text-red-900 mt-2 text-right">
                {errors.start_at.message}
              </p>
            )}
            {errors?.end_at && (
              <p data-testid="error-end" id="error-end" className="text-red-900 mt-2 text-right">
                {errors.end_at.message}
              </p>
            )}
            <div className="items-center justify-center mt-8 flex">
              <button
                type="submit"
                disabled={!isValid}
                className={classNames("rounded p-2 w-44", {
                  "bg-gray-500 hover:bg-gray-500": !isValid,
                  "bg-indigo-600 hover:bg-indigo-500": isValid,
                })}>
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  )
}
