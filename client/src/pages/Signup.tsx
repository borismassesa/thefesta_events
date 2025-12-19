import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Eye, EyeOff, Loader2, Check } from "lucide-react";
import signupImg from "@assets/stock_images/elegant_wedding_invi_ec57761b.jpg";

export default function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<"couple" | "vendor">("couple");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate signup delay
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="min-h-screen w-full flex bg-background">
      {/* Left Side - Image */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-zinc-100">
        <img 
          src={signupImg} 
          alt="Wedding stationery" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        <div className="relative z-10 p-12 flex flex-col justify-between h-full text-white">
          <Link href="/">
            <a className="font-serif text-3xl tracking-wide hover:opacity-80 transition-opacity w-fit drop-shadow-md">
              TheFesta
            </a>
          </Link>
          
          <div className="max-w-md">
            <h2 className="text-4xl font-serif mb-6 leading-tight drop-shadow-md">
              Start planning the celebration of a lifetime.
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                    <Check className="w-4 h-4" />
                 </div>
                 <span className="text-sm font-medium tracking-wide drop-shadow-sm">Manage guests & RSVPs easily</span>
              </div>
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                    <Check className="w-4 h-4" />
                 </div>
                 <span className="text-sm font-medium tracking-wide drop-shadow-sm">Find top-rated local vendors</span>
              </div>
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                    <Check className="w-4 h-4" />
                 </div>
                 <span className="text-sm font-medium tracking-wide drop-shadow-sm">Stay on budget with smart tools</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12 lg:p-24 relative">
        <div className="w-full max-w-sm space-y-8">
          
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <Link href="/">
              <a className="font-serif text-3xl text-primary">TheFesta</a>
            </Link>
          </div>

          <div className="space-y-2 text-center lg:text-left">
            <h1 className="text-3xl lg:text-4xl font-semibold tracking-tight text-primary">
              Create an account
            </h1>
            <p className="text-secondary">
              Join thousands of couples planning their big day.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* User Type Toggle */}
            <div className="grid grid-cols-2 gap-1 p-1 bg-muted rounded-lg border border-border/50">
               <button
                 type="button"
                 onClick={() => setUserType("couple")}
                 className={`text-sm font-medium py-2 rounded-md transition-all ${
                   userType === "couple" 
                   ? "bg-background text-foreground shadow-sm" 
                   : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                 }`}
               >
                 I'm a Couple
               </button>
               <button
                 type="button"
                 onClick={() => setUserType("vendor")}
                 className={`text-sm font-medium py-2 rounded-md transition-all ${
                   userType === "vendor" 
                   ? "bg-background text-foreground shadow-sm" 
                   : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                 }`}
               >
                 I'm a Vendor
               </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-primary">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="Jane"
                  className="flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-primary">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Doe"
                  className="flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-primary">
                Email
              </label>
              <input
                type="email"
                placeholder="name@example.com"
                className="flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-primary">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 pr-10"
                  required
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <p className="text-[10px] text-secondary">
                Must be at least 8 characters long.
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-12 w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Get Started"
              )}
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground text-secondary">
                Or sign up with
              </span>
            </div>
          </div>

           <div className="grid grid-cols-2 gap-4">
             <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-11">
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26.81-.58z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
             </button>
             <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-11">
                <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
             </button>
          </div>

          <div className="text-center text-sm text-secondary">
            Already have an account?{" "}
            <Link href="/login">
              <a className="font-semibold text-primary hover:underline underline-offset-4">
                Sign in
              </a>
            </Link>
          </div>
          
          <div className="absolute top-8 right-8 lg:top-12 lg:right-12">
            <Link href="/">
              <a className="flex items-center text-sm font-medium text-secondary hover:text-primary transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to home
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}