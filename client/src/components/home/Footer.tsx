import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-24 px-[5vw] border-t border-border bg-background">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-24">
        <div className="col-span-2 md:col-span-1">
          <span className="font-semibold text-sm tracking-tight text-primary block mb-6">
            CHRONICLE
          </span>
          <span className="text-xs text-secondary font-mono">
            © 2024
          </span>
        </div>

        <div>
          <h4 className="font-mono text-xs text-secondary mb-6 uppercase tracking-wider">
            Sitemap
          </h4>
          <ul className="space-y-4 text-sm text-secondary">
            <li><a href="#" className="hover:text-primary transition-colors">Start</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Issues</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Gift Cards</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-xs text-secondary mb-6 uppercase tracking-wider">
            Company
          </h4>
          <ul className="space-y-4 text-sm text-secondary">
            <li><a href="#" className="hover:text-primary transition-colors">Manifesto</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Legal</a></li>
          </ul>
        </div>

        <div className="col-span-2 md:col-span-1">
          <h4 className="font-mono text-xs text-secondary mb-6 uppercase tracking-wider">
            Newsletter
          </h4>
          <form className="flex items-center border-b border-border pb-2" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="email@address.com" className="bg-transparent w-full text-sm text-primary focus:outline-none placeholder:text-secondary font-mono" />
            <button className="text-secondary hover:text-primary transition-colors">
              <ArrowUpRight size={16} />
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
}
