import { Leaf } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => (
    <footer className="border-t py-8 md:py-12">
        <div className="container flex flex-col gap-6 md:flex-row md:items-center">
            <div className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-primary" />
                <Link href="/" className="text-xl font-serif">
                    La Ferme de Beautheac
                </Link>
            </div>
            <nav className="flex gap-6 md:ml-auto">
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Mentions légales
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Politique de confidentialité
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Plan du site
                </Link>
            </nav>
            <div className="md:ml-auto text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} La Ferme de Beautheac. Tous droits réservés.
            </div>
        </div>
    </footer>
);

export default Footer;