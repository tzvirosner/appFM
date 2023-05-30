"use client"

import Link from "next/link";
import React, {useState} from "react";
import axios, {AxiosResponse} from 'axios';

export default function Page() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        // @ts-ignore
        const res: AxiosResponse = await axios.post(process.env.ENDPOINT, {
            message: `${firstName} ${lastName} - Email: (${email}) says: ${message}`},
        {
            headers: {
                "x-api-key": process.env.API_KEY,
                "Content-Type": "application/json"
            }
        })
        const {status} = res;
        if (status === 200) {
            alert("Message sent.")
            setFirstName("")
            setLastName("")
            setEmail("")
            setMessage("")
            
        } else {
            alert("Message failed to send.")
        }
    }


    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 pt-40 py-12 lg:px-8 bg-white">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="space-y-12">
                    <div className="border-b border-gray-400/10 pb-12">
                        <h1 className="text-base text-xl font-semibold leading-7 text-black-500">Contact Us</h1>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="first-name"
                                       className="block text-sm font-medium leading-6 text-black-500">
                                    First name
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={(e) => setFirstName(e.target.value)}
                                        type="text"
                                        name="first-name"
                                        id="first-name"
                                        autoComplete="given-name"
                                        className="block w-full rounded-md border-0 py-1.5 px-1.5 text-black-500 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-black-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="last-name"
                                       className="block text-sm font-medium leading-6 text-black-500">
                                    Last name
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={(e) => setLastName(e.target.value)}
                                        type="text"
                                        name="last-name"
                                        id="last-name"
                                        autoComplete="family-name"
                                        className="block w-full rounded-md border-0 py-1.5 px-1.5 text-black-500 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-black-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="email"
                                       className="block text-sm font-medium leading-6 text-black-500">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={(e) => setEmail(e.target.value)}
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        className="block w-full rounded-md border-0 py-1.5 px-1.5 text-black-500 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-black-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="about"
                                       className="block text-sm font-medium leading-6 text-black-500">
                                    Comments
                                </label>
                                <div className="mt-2">
                                <textarea
                                    id="about"
                                    name="about"
                                    onChange={(e) => setMessage(e.target.value)}
                                    rows={3}
                                    className="block w-full rounded-md border-0 py-1.5 px-1.5 text-black-500 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-black-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    defaultValue={''}
                                />
                                </div>
                                <p className="mt-3 text-sm leading-6 text-black-500">Any details about your needs for
                                    your project</p>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-black-500"
                    >
                        <Link href={"/"}>Go Back</Link>
                    </button>
                    <button
                        onClick={handleSubmit}
                        // type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}
