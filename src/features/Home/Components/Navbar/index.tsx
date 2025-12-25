import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

function Navbar() {
  const [isShowMenu, setIsShowMenu] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => setIsShowMenu(!isShowMenu)}
          className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
        >
          {isShowMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <nav
          className={`${
            isShowMenu ? 'flex' : 'hidden'
          } lg:flex flex-col lg:flex-row absolute lg:relative top-full left-0 right-0 lg:top-auto bg-background lg:bg-transparent border-b lg:border-0 p-4 lg:p-0 gap-4 lg:gap-6 items-start lg:items-center`}
        >
          <a href="#home" className="text-sm font-medium hover:text-primary transition-colors">
            Trang chủ
          </a>
          <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">
            Tính năng
          </a>
          <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">
            Ứng dụng
          </a>
          <a href="#developer" className="text-sm font-medium hover:text-primary transition-colors">
            Team phát triển
          </a>
          <div className="flex gap-2 lg:ml-4">
            <Link
              to="/account/registry"
              className="px-4 py-2 text-sm font-medium border rounded-lg hover:bg-muted transition-colors"
            >
              Đăng ký
            </Link>
            <Link
              to="/account/login"
              className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Đăng nhập
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
