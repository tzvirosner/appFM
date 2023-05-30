import Image from 'next/image'
import Link from "next/link";
import Address from "@/app/calculate/address/page";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
                {/*<ul className="flex border-b">*/}
                {/*    <li className="-mb-px mr-1">*/}
                {/*        <Link href={"/address"}> Address</Link>*/}
                {/*    </li>*/}
                {/*    <li>*/}
                {/*        <Link href={"/amort_initial"}>Amortization Initial</Link>*/}
                {/*    </li>*/}
                {/*    <li>*/}
                {/*        <Link href={"/amort_refinance"}>Amortization Initial</Link>*/}
                {/*    </li>*/}
                {/*    <li>*/}
                {/*        <Link href={"/budget"}>Budget</Link>*/}
                {/*    </li>*/}
                {/*    <li>*/}
                {/*        <Link href={"/debt"}>Debt</Link>*/}
                {/*    </li>*/}
                {/*    <li>*/}
                {/*        <Link href={"/expenses"}>Expenses</Link>*/}
                {/*    </li>*/}
                {/*    <li>*/}
                {/*        <Link href={"/hold_time"}>Hold Time</Link>*/}
                {/*    </li>*/}
                {/*    <li>*/}
                {/*        <Link href={"/how_many_expenses"}>How many expenses</Link>*/}
                {/*    </li>*/}
                {/*    <li>*/}
                {/*        <Link href={"/is_there_refinance"}>Is There Refinance</Link>*/}
                {/*    </li>*/}
                {/*    <li>*/}
                {/*        <Link href={"/other_income"}>Other Income</Link>*/}
                {/*    </li>*/}
                {/*    <li>*/}
                {/*        <Link href={"/other_rental_inputs"}>Other Rental Inputs</Link>*/}
                {/*    </li>*/}
                {/*    <li>*/}
                {/*        <Link href={"/output_file"}>Output File</Link>*/}
                {/*    </li>*/}
                {/*    <li>*/}
                {/*        <Link href={"/refinance_sizing"}>Refinance Sizing</Link>*/}
                {/*    </li>*/}
                {/*    <li>*/}
                {/*        <Link href={"/refinance_will_not_work"}>Refinance Will Not Work</Link>*/}
                {/*    </li>*/}
                {/*    <li>*/}
                {/*        <Link href={"/rental_income"}>Rental income</Link>*/}
                {/*    </li>*/}
                {/*    <li>*/}
                {/*        <Link href={"/rental_income_hm"}>Rental Income HM</Link>*/}
                {/*    </li>*/}
                {/*    <li>*/}
                {/*        <Link href={"/sale"}>Sale</Link>*/}
                {/*    </li>*/}

                {/*</ul>*/}
                <Address/>
            </div>
        </main>
    )
}
