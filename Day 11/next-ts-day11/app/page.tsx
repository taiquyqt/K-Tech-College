import { notFound } from "next/navigation";

export default function Home() {
  const found = false;
  if (!found) notFound();
  return (
    <div>
      
      Home Page1
    </div>
    
  );
}
