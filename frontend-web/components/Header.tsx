import { ShoppingBag, Search, User } from 'lucide-react';

export default function Header() {
    return (
        <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                <div className="flex-1 flex items-center gap-8">
                    <Search className="w-5 h-5 cursor-pointer hover:text-[#D4AF37]" />
                </div>

                <h1 className="text-3xl font-serif tracking-[0.2em] uppercase">Manus Scents</h1>

                <div className="flex-1 flex items-center justify-end gap-6">
                    <User className="w-5 h-5 cursor-pointer hover:text-[#D4AF37]" />
                    <div className="relative cursor-pointer group">
                        <ShoppingBag className="w-5 h-5 group-hover:text-[#D4AF37]" />
                        <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">0</span>
                    </div>
                </div>
            </div>
        </header>
    );
}
