import { LuContainer } from "react-icons/lu";
import { FaLayerGroup } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="flex space-x-10 px-10 py-2 border mb-8 shadow">
      <Image src="/logo.png" width={70} height={70} alt="containrx-logo" />
      <div className="flex items-center space-x-2">
        <Link
          href="/"
          className="font-medium flex items-center space-x-2 hover:bg-gray-50 px-4 py-2 rounded-sm"
        >
          <FaLayerGroup /> <span>Images</span>
        </Link>
        <Link
          href="/container"
          className="font-medium flex items-center space-x-2 hover:bg-gray-50 px-4 py-2 rounded-sm"
        >
          <LuContainer /> <span>Containers</span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
