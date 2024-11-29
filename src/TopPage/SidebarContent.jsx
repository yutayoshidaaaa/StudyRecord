import { Link } from "react-router-dom";

const SidebarContent = ({ isOpen, toggleSidebar }) => {
    return (
      <div
        className={`fixed top-0 left-0 h-full bg-green-400 text-white transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ width: "16rem" }}
      >
    
        <ul className="space-y-8">
          <li className="text-xl font-Yusei font-bold text-black mr-4 mt-8">ショートカット</li>
          <li className="text-lg font-Yusei text-black m-8 mt-24"><a href="#Todo">・今日のTodoを作成する</a></li>
          <Link to="/record">
            <li className="tedt-lg font-Yusei text-black m-8">・勉強記録をつける</li>
          </Link>
        </ul>
      </div>
    );
  };

  export default SidebarContent;