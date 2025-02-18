import React from 'react';

import { Button } from "@/components/ui/button"

const Header: React.FC = () => {
    return (
        <header className="p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-black text-lg font-bold">FireNances</div>
                <nav className="flex space-x-4">
                    <Button variant="outline">Iniciar sesión</Button>
                    <Button>Crear una cuenta</Button>
                </nav>
            </div>
        </header>
    );
};

export default Header;
