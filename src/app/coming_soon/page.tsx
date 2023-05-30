import Link from "next/link";

export default function Page() {
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 pt-40 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <div className="text-sm leading-6 text-white-50">
                        <strong className="font-semibold"> </strong>
                        <svg viewBox="0 0 2 2" className="mx-2 inline h-0.5 w-0.5 fill-current" aria-hidden="true">
                            <circle cx={1} cy={1} r={1} />
                        </svg>
                        <h1 className={"text-neutral-50"}>Coming Soon...</h1>
                        <br/>
                    </div>
                    <Link
                        href="/"
                        className="flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                    >
                        Go Back <span aria-hidden="true">&rarr;</span>
                    </Link>
                </div>            </div>
        </div>
    )
}
