import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <main>
        <h1 className="text-3xl font-bold pb-2">ProfessorWillow</h1>
        <Link href="/events">
          <Button variant="outline">View Events</Button>
        </Link>
      </main>
    </div>
  );
}
