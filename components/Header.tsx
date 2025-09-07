
import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="text-center">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 " style={{ lineHeight: '1.5' }}>
                Seguimiento de Métricas Corporales
            </h1>
            <p className="mt-4 text-gray-400">No pain no gain!</p>
        </header>
    );
};

export default Header;
