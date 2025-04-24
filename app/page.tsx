import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { getRole } from "@/utils/roles";
import Link from "next/link";
import { redirect } from "next/navigation"

export default async function Home() {
  const { userId } = await auth();
  const role = await getRole();

  if (userId && role) {
    redirect(`/${role}`);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center">
            Welcome to <br />
            <span className="text-blue-600 text-5xl md:text-6xl">
              HealthAxis
            </span>
          </h1>
        </div>

        <div className="text-center max-w-xl flex flex-col items-center justify-center">
          <p className="mb-8">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, pariatur aut Lorem ipsum dolor sit amet.
          </p>
        </div>

        <div className="flex justify-center items-center gap-4">
          {
            userId ? <>
              <Link href={`/${role}`}>
                <Button>
                  View Dashboard
                </Button> 
              </Link>
              {/* <UserButton></UserButton> */}
            </> : <>
              <Link href="/sign-up">
                <Button className="md:text-base font-medium">
                  New Patient
                </Button>
              </Link>

              <Link href="/sign-in">
                <Button
                  variant="outline"
                  className="md:text-base underline hover:text-blue-500">
                  Login to account
                </Button>
              </Link>
            </>
          }
        </div>
      </div>

      <footer className="mt-8">
        <p className="text-center text-sm">
          &copy; 2025 HealthAxis Hospitam Management System.
        </p>

      </footer>
    </div>
  );
}
