export const Header: React.FC = () => {
    const navLinks = ['Home', 'Hubs', 'Review', 'My Work', "Other's Work", 'Login'];

    return (
        <header className="w-full bg-gray-900 text-white shadow-lg sticky top-0 z-10 border-b border-gray-800">

            {/* override root text-center */}
            <div className="w-full text-left">

                <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

                    <div className="text-2xl font-extrabold text-indigo-400 tracking-wider">
                        Share&View
                    </div>

                    <nav className="flex space-x-6">
                        {navLinks.map(link => (
                            <a
                                key={link}
                                href="#"
                                className="text-sm font-medium text-gray-300 hover:text-indigo-400 transition-colors duration-200"
                                onClick={(e) => e.preventDefault()}
                            >
                                {link}
                            </a>
                        ))}
                    </nav>

                    <div className="flex items-center">
                        <i className="pi pi-user text-xl cursor-pointer hover:text-indigo-400 transition-colors"></i>
                    </div>

                </div>
            </div>
        </header>
    );
};
