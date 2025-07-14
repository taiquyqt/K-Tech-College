
import { notFound } from "next/navigation";

export default function Home() {
  const found = true;
  if (!found) notFound();
  return (
    <div>
      Home Page
    </div>
    
  );
}
