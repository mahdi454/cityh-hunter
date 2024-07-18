import Link from "next/link"

export default function Denied() {
    return (
        <section className="flex flex-col gap-8 items-center">
            <h1 className="text-5xl mt-14 ">Access Denied</h1>
            <p className="text-3xl max-w-2xl text-center">You do not have the
                required access level to view this page.
            </p>
            <Link href="/" className="text-3xl underline">Return to Home Page</Link>
        </section>
    )
}