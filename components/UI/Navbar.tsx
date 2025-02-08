import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex space-x-4">
        <Link href="/" className="hover:underline">Home</Link>
        <Link href="/map" className="hover:underline">Map</Link>
        <Link href="/mapExamples/map1" className="hover:underline">Map1</Link>
        <Link href="/mapExamples/map2" className="hover:underline">Map2</Link>
        <Link href="/mapExamples/map3" className="hover:underline">Map3</Link>
        <Link href="/mapExamples/map4" className="hover:underline">Map4</Link>
        <Link href="/mapExamples/map5" className="hover:underline">Map5</Link>
        <Link href="/mapExamples/map6" className="hover:underline">Map6</Link>
        <Link href="/mapExamples/map7" className="hover:underline">Map7</Link>
        <Link href="/mapExamples/map8" className="hover:underline">Map8</Link>
        <Link href="/mapExamples/map9" className="hover:underline">Map9</Link>
        <Link href="/about" className="hover:underline">About</Link>
      </div>
    </nav>
  );
}
