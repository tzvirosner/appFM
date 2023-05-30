'use client';

import Link from "next/link";
import React, { Fragment, useState } from 'react'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'

function NavBar() {
  const [open, setOpen] = useState(false)
  return (
      <div className="dark">
        <header className="relative bg-slate-950">
          {/*<p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8 call-to-action-nav">*/}
          {/*  {`BREAKPOINT 2023 - NEW YORK CITY. - GET TICKETS ->`}*/}
          {/*</p>*/}
          <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
            <div className="border-b border-black">
              <div className="flex h-16 items-center">

                <div className="ml-4 flex lg:ml-0">
                  <a href="#">
                    <span className="sr-only">appFM</span>
                    <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt=""
                    />
                  </a>
                  <h3 className={"pl-5 mt-1 text-neutral-50"}>appFM</h3>
                </div>
                <div className="ml-auto flex items-center">
                  <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                    <a href="/coming_soon" className="text-sm font-medium text-neutral-50 hover:text-gray-800">
                      Sign in
                    </a>
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                    <a href="/coming_soon" className="text-sm font-medium text-neutral-50 hover:text-gray-800">
                      Create account
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>
      </div>
  )
}

export default function Home() {
  return (
      <>
        <div>
          <NavBar />
          <svg
            style={{height: "80vh"}}
              viewBox="0 0 1024 1024"
              className="absolute left-1/2 top-1/6 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
              aria-hidden="true"
          >
            <rect></rect>
            <circle cx={10} cy={150} r={300}
                    fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
            <circle cx={1100} cy={100} r={300}
                    fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
            <defs>
              <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#E935C1" />
              </radialGradient>
            </defs>
          </svg>
          <div className="mx-auto max-w-full text-center lg:mx-0 lg:flex-auto lg:pt-60 lg:text-center pt-32">
            <h1 className="text-4xl font-bold tracking-tight text-white-900 sm:text-6xl"
                style={{color: "white"}}
            >
              appFM
            </h1>
          </div>
          <div className="mx-auto max-w-2xl text-center lg:text-center dark lg:py-32 py-16">
            <h1 className="text-4xl font-bold tracking-tight text-white-900 sm:text-6xl"
                style={{color: "white"}}
            >
              Cloud Based Financial Modeling
            </h1>
          </div>
          <div className="mx-auto max-w-2xl text-center lg:text-center flex flex-row justify-evenly dark ">
            <div className="firstBtn btn">
              <Link
                  href="https://immense-ocean-60893.herokuapp.com"
                  className={"text-sm font-semibold leading-6 text-white mt-2"}
                  // className="rounded-md dark px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Get started
              </Link>
            </div>
            <div className="secondBtn btn">
              <Link href="/contactus" className="text-sm font-semibold leading-6 text-white mt-2">
                Contact Us <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div className="mx-auto max-w-2xl text-center lg:text-center">
            {/*<h3 className="text-2xl tracking-tight text-blue-900 sm:text-xl">*/}
            {/*  Powerful tools and integrations from companies all around the world.*/}
            {/*</h3>*/}
            {/*<div className={"py-5"}>*/}
            {/*  <Image src={"/temp_companies.png"}*/}
            {/*         alt={"temp companies"}*/}
            {/*         width={1000}*/}
            {/*         height={1000}*/}
            {/*  />*/}
            {/*</div>*/}
          </div>
        </div>
      </>

  )
}
