import NavBar from "./NavBar";

interface HeaderProps {
  userName: string;
}

function Header({ userName }: HeaderProps) {

  return (
    <div
      className="
        bg-gradient-to-t from-[#4D86E0] to-[#1A4FD8]
        py-6 px-4
        h-1/3
      ">
      <NavBar />
      <h1 className="mt-10 text-white text-3xl">Welcome Back, {userName}🖐️</h1>
      <h3 className="mt-1 text-white/50">This is your Financal Overview Raport</h3>
    </div>
  )
}

export default Header;
