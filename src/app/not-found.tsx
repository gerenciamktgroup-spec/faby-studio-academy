import Link from 'next/link';
import { Sparkles, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-3xl bg-rose-600/20 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-6">
        <Sparkles className="w-8 h-8" />
      </div>

      <span className="text-xs font-bold uppercase tracking-widest text-rose-400 mb-2">Error 404</span>
      <h1 className="text-3xl sm:text-4xl font-black font-display tracking-tight text-white mb-4">
        Página no encontrada
      </h1>

      <p className="text-slate-400 text-sm sm:text-base max-w-md mb-8 leading-relaxed">
        El contenido al que intentas acceder no existe, ha sido movido o requiere permisos específicos en la academia.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold text-sm shadow-lg shadow-rose-600/20 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Inicio</span>
        </Link>
        <Link
          href="/cursos"
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-colors"
        >
          <span>Ver Catálogo</span>
        </Link>
      </div>
    </div>
  );
}
