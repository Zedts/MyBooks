'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowRight, BookOpen, Sparkles, TrendingUp, Users, ChevronRight, Menu, X, LogIn, UserPlus } from 'lucide-react';
import LogoLoop from '@/src/reactbits.dev/LogoLoop';
import { AuthModal } from '@/src/components/modals/AuthModal';
import { useModal } from '@/src/hooks/useModal';

export default function Dashboard() {
  const { isOpen, defaultTab, openLogin, openRegister, close } = useModal();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Intersection observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-anim');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.observe-reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative antialiased selection:bg-white selection:text-black overflow-x-hidden text-neutral-200 bg-neutral-950">
      {/* Background Image */}
      <div 
        className="fixed top-0 left-0 w-full h-screen bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/9ebb2efd-59e4-4b29-b860-3694c884d382_3840w.webp")',
          filter: 'blur(40px)',
          maskImage: 'linear-gradient(to bottom, transparent, black 0%, black 80%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 0%, black 80%, transparent)',
          zIndex: 0
        }}
      />

      {/* Ambient Background Glows */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[120px] opacity-50" />
        <div className="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] bg-fuchsia-900/10 rounded-full blur-[120px] opacity-40" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full border-b border-white/5 bg-neutral-950/70 backdrop-blur-xl" style={{ zIndex: 50 }}>
        <div className="flex h-16 max-w-7xl mr-auto ml-auto pr-6 pl-6 items-center justify-between">
          <a href="#" className="flex items-center gap-2 group">
            <BookOpen className="w-6 h-6 text-white group-hover:text-indigo-400 transition-colors" />
            <span className="text-xl font-bold text-white font-mono">MyBooks</span>
          </a>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
            <a href="#collection" className="hover:text-white transition-colors cursor-pointer">Collection</a>
            <a href="#collection" className="hover:text-white transition-colors cursor-pointer">Categories</a>
            <a href="#currators" className="hover:text-white transition-colors cursor-pointer">Curators</a>
            <a href="#footer" className="hover:text-white transition-colors cursor-pointer">About</a>
          </div>

          <div className="flex items-center gap-3">
            {/* Desktop Auth Buttons */}
            <button
              onClick={openLogin}
              className="hidden sm:flex items-center gap-2 px-5 py-2 bg-white text-black font-medium rounded-lg hover:bg-neutral-200 transition-all cursor-pointer"
            >
              Sign In
            </button>
            <button
              onClick={openRegister}
              className="hidden sm:flex items-center gap-2 px-5 py-2 bg-white/10 backdrop-blur-xl text-white font-medium rounded-lg border border-white/20 hover:bg-white/20 transition-all cursor-pointer"
            >
              Register
            </button>

            {/* Mobile Auth Icons */}
            <button
              onClick={openLogin}
              className="sm:hidden flex items-center justify-center w-10 h-10 bg-white text-black rounded-lg hover:bg-neutral-200 transition-all cursor-pointer"
              aria-label="Sign In"
            >
              <LogIn className="w-5 h-5" />
            </button>
            <button
              onClick={openRegister}
              className="sm:hidden flex items-center justify-center w-10 h-10 bg-white/10 backdrop-blur-xl text-white rounded-lg border border-white/20 hover:bg-white/20 transition-all cursor-pointer"
              aria-label="Register"
            >
              <UserPlus className="w-5 h-5" />
            </button>

            {/* Burger Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 text-white hover:bg-white/10 rounded-lg transition-all cursor-pointer"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/5 bg-neutral-950/95 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-4">
              <a
                href="#collection"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-neutral-400 hover:text-white transition-colors py-2 cursor-pointer"
              >
                Collection
              </a>
              <a
                href="#collection"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-neutral-400 hover:text-white transition-colors py-2 cursor-pointer"
              >
                Categories
              </a>
              <a
                href="#currators"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-neutral-400 hover:text-white transition-colors py-2 cursor-pointer"
              >
                Curators
              </a>
              <a
                href="#footer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-neutral-400 hover:text-white transition-colors py-2 cursor-pointer"
              >
                About
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="md:pt-48 md:pb-32 flex flex-col text-center max-w-7xl mr-auto ml-auto pt-32 pr-6 pb-20 pl-6 relative items-center" style={{ zIndex: 10 }}>
        <div className="inline-flex gap-2 reveal-anim text-xs text-neutral-300 font-mono bg-white/5 border-white/10 border rounded-full mb-8 pt-1 pr-3 pb-1 pl-3 gap-x-2 gap-y-2 items-center">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          New Collection Dropped
        </div>
        
        <h1 className="md:text-6xl lg:text-7xl leading-[1.1] reveal-anim delay-100 text-5xl font-semibold text-white tracking-tight max-w-4xl mb-6">
          Fuel your mind with<br className="hidden md:block" /> timeless perspectives.
        </h1>
        
        <p className="md:text-xl leading-relaxed reveal-anim delay-200 text-lg text-neutral-400 max-w-2xl mb-10">
          A curated sanctuary for the modern intellect. Discover design, philosophy, and technology books that define the future.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto reveal-anim delay-300">
          <button
            onClick={openRegister}
            className="sm:w-auto hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 font-semibold text-black bg-white w-full rounded pt-3 pr-8 pb-3 pl-8 cursor-pointer"
          >
            Start Reading
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={openRegister}
            className="w-full sm:w-auto px-8 py-3 bg-white/5 border border-white/10 text-white font-medium rounded hover:bg-white/10 transition-all flex items-center justify-center backdrop-blur-md cursor-pointer"
          >
            Register
          </button>
        </div>
      </header>

      {/* Publisher Logos */}
      <section className="border-y border-white/5 bg-white/2 backdrop-blur-sm reveal-anim delay-400 relative w-full py-12" style={{ zIndex: 10 }}>
        <LogoLoop
          logos={[
            { node: <span className="text-2xl font-bold text-white/40 whitespace-nowrap">O&apos;REILLY</span> },
            { node: <span className="text-2xl font-bold text-white/40 whitespace-nowrap">PENGUIN</span> },
            { node: <span className="text-2xl font-bold text-white/40 whitespace-nowrap">MANNING</span> },
            { node: <span className="text-2xl font-bold text-white/40 whitespace-nowrap">APRESS</span> },
            { node: <span className="text-2xl font-bold text-white/40 whitespace-nowrap">PACKT</span> },
          ]}
          speed={40}
          direction="left"
          pauseOnHover={true}
          logoHeight={32}
          gap={48}
          fadeOut={false}
          width="100%"
          className="opacity-60 hover:opacity-100 transition-opacity duration-500"
        />
      </section>

      {/* Filter/Tabs */}
      <section className="reveal-anim delay-500 max-w-7xl mt-20 mr-auto ml-auto pr-6 pl-6 relative" id="collection" style={{ zIndex: 10 }}>
        <div className="flex flex-col md:flex-row md:items-center gap-6 mb-12 gap-x-6 gap-y-6 justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Featured Collection</h2>
            <p className="text-neutral-400">Handpicked for the curious mind</p>
          </div>
          <div className="flex items-center gap-3 overflow-x-auto">
            <button className="px-5 py-2 bg-white text-black font-medium rounded-lg whitespace-nowrap">All Books</button>
            <button className="px-5 py-2 bg-white/5 text-neutral-300 font-medium rounded-lg hover:bg-white/10 transition-colors whitespace-nowrap">Design</button>
            <button className="px-5 py-2 bg-white/5 text-neutral-300 font-medium rounded-lg hover:bg-white/10 transition-colors whitespace-nowrap">Tech</button>
            <button className="px-5 py-2 bg-white/5 text-neutral-300 font-medium rounded-lg hover:bg-white/10 transition-colors whitespace-nowrap">Philosophy</button>
          </div>
        </div>

        {/* Book Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Book Card 1 */}
          <div className="group glass-panel rounded-xl overflow-hidden hover:scale-[1.02] transition-all duration-300 cursor-pointer">
            <div className="relative h-80 bg-linear-to-br from-indigo-500/20 to-purple-500/20 overflow-hidden">
              <Image
                src="/The Design of Everyday Things.png"
                alt="The Design of Everyday Things"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
              <div className="absolute top-3 right-3 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs font-medium">Design</div>
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">The Design of Everyday Things</h3>
              <p className="text-sm text-neutral-400 mb-3">Don Norman</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-500">Classic</span>
                <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </div>

          {/* Book Card 2 */}
          <div className="group glass-panel rounded-xl overflow-hidden hover:scale-[1.02] transition-all duration-300 cursor-pointer">
            <div className="relative h-80 bg-linear-to-br from-emerald-500/20 to-teal-500/20 overflow-hidden">
              <Image
                src="/Clean Code.png"
                alt="Clean Code"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
              <div className="absolute top-3 right-3 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs font-medium">Tech</div>
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">Clean Code</h3>
              <p className="text-sm text-neutral-400 mb-3">Robert C. Martin</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-500">Essential</span>
                <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </div>

          {/* Book Card 3 */}
          <div className="group glass-panel rounded-xl overflow-hidden hover:scale-[1.02] transition-all duration-300 cursor-pointer">
            <div className="relative h-80 bg-linear-to-br from-orange-500/20 to-red-500/20 overflow-hidden">
              <Image
                src="/Thinking, Fast and Slow.png"
                alt="Thinking, Fast and Slow"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
              <div className="absolute top-3 right-3 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs font-medium">Philosophy</div>
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">Thinking, Fast and Slow</h3>
              <p className="text-sm text-neutral-400 mb-3">Daniel Kahneman</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-500">Bestseller</span>
                <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </div>

          {/* Book Card 4 */}
          <div className="group glass-panel rounded-xl overflow-hidden hover:scale-[1.02] transition-all duration-300 cursor-pointer">
            <div className="relative h-80 bg-linear-to-br from-pink-500/20 to-rose-500/20 overflow-hidden">
              <Image
                src="/Refactoring UI.png"
                alt="Refactoring UI"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
              <div className="absolute top-3 right-3 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs font-medium">Design</div>
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">Refactoring UI</h3>
              <p className="text-sm text-neutral-400 mb-3">Adam Wathan & Steve Schoger</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-500">Popular</span>
                <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </div>

          {/* Book Card 5 */}
          <div className="group glass-panel rounded-xl overflow-hidden hover:scale-[1.02] transition-all duration-300 cursor-pointer">
            <div className="relative h-80 bg-linear-to-br from-blue-500/20 to-cyan-500/20 overflow-hidden">
              <Image
                src="/The Pragmatic Programmer.png"
                alt="The Pragmatic Programmer"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
              <div className="absolute top-3 right-3 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs font-medium">Tech</div>
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">The Pragmatic Programmer</h3>
              <p className="text-sm text-neutral-400 mb-3">David Thomas & Andrew Hunt</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-500">Must-Read</span>
                <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </div>

          {/* Book Card 6 */}
          <div className="group glass-panel rounded-xl overflow-hidden hover:scale-[1.02] transition-all duration-300 cursor-pointer">
            <div className="relative h-80 bg-linear-to-br from-violet-500/20 to-purple-500/20 overflow-hidden">
              <Image
                src="/Atomic Habits.png"
                alt="Atomic Habits"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
              <div className="absolute top-3 right-3 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs font-medium">Philosophy</div>
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">Atomic Habits</h3>
              <p className="text-sm text-neutral-400 mb-3">James Clear</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-500">Trending</span>
                <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </div>

          {/* Book Card 7 */}
          <div className="group glass-panel rounded-xl overflow-hidden hover:scale-[1.02] transition-all duration-300 cursor-pointer">
            <div className="relative h-80 bg-linear-to-br from-amber-500/20 to-yellow-500/20 overflow-hidden">
              <Image
                src="/Don't Make Me Think.png"
                alt="Don't Make Me Think"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
              <div className="absolute top-3 right-3 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs font-medium">Design</div>
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">Don&apos;t Make Me Think</h3>
              <p className="text-sm text-neutral-400 mb-3">Steve Krug</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-500">Classic</span>
                <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </div>

          {/* Book Card 8 */}
          <div className="group glass-panel rounded-xl overflow-hidden hover:scale-[1.02] transition-all duration-300 cursor-pointer">
            <div className="relative h-80 bg-linear-to-br from-green-500/20 to-emerald-500/20 overflow-hidden">
              <Image
                src="/Zero to One.png"
                alt="Zero to One"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
              <div className="absolute top-3 right-3 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs font-medium">Tech</div>
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">Zero to One</h3>
              <p className="text-sm text-neutral-400 mb-3">Peter Thiel</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-500">Inspiring</span>
                <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Section */}
      <section className="max-w-7xl mx-auto px-6 mt-32 observe-reveal relative" id="currators" style={{ zIndex: 10 }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Large Feature Card */}
          <div className="md:col-span-2 glass-panel rounded-2xl p-10 relative overflow-hidden group cursor-pointer hover:border-indigo-500/50 transition-all">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all" />
            <Sparkles className="w-10 h-10 text-indigo-400 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-3">Curator&apos;s Choice</h3>
            <p className="text-neutral-400 leading-relaxed mb-6">
              Every month, our expert curators handpick the most influential reads across design, tech, and philosophy. Explore perspectives that challenge convention.
            </p>
            <a href="#" className="inline-flex items-center gap-2 text-indigo-400 font-medium group-hover:gap-3 transition-all">
              Explore Now <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Small Feature Card 1 */}
          <div className="glass-panel rounded-2xl p-8 group cursor-pointer hover:border-emerald-500/50 transition-all">
            <TrendingUp className="w-8 h-8 text-emerald-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Trending Now</h3>
            <p className="text-sm text-neutral-400">
              See what the community is reading this week
            </p>
          </div>

          {/* Small Feature Card 2 */}
          <div className="glass-panel rounded-2xl p-8 group cursor-pointer hover:border-pink-500/50 transition-all">
            <Users className="w-8 h-8 text-pink-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Join Community</h3>
            <p className="text-sm text-neutral-400">
              Connect with readers and thinkers worldwide
            </p>
          </div>

          {/* Medium Feature Card */}
          <div className="md:col-span-2 glass-panel rounded-2xl p-10 relative overflow-hidden group cursor-pointer hover:border-purple-500/50 transition-all">
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all" />
            <BookOpen className="w-10 h-10 text-purple-400 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-3">Personal Library</h3>
            <p className="text-neutral-400 leading-relaxed mb-6">
              Build your digital sanctuary. Save favorites, track progress, and create custom reading lists tailored to your intellectual journey.
            </p>
            <a href="#" className="inline-flex items-center gap-2 text-purple-400 font-medium group-hover:gap-3 transition-all">
              Start Building <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-32 border-t border-white/5 bg-neutral-950 pt-16 pb-8 relative" id="footer" style={{ zIndex: 10 }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-6 h-6 text-white" />
                <span className="text-xl font-bold text-white font-mono">MyBooks</span>
              </div>
              <p className="text-neutral-400 text-sm leading-relaxed max-w-md mb-6">
                A curated digital library for the modern intellect. Discover timeless books on design, technology, and philosophy.
              </p>
              <div className="flex items-center gap-4">
                <a href="https://github.com/zedts" className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-neutral-400 hover:text-white">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.38 7.86 10.9.58.1.79-.25.79-.56v-1.96c-3.2.7-3.87-1.39-3.87-1.39-.53-1.33-1.3-1.68-1.3-1.68-1.06-.73.08-.72.08-.72 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.72 1.27 3.38.97.1-.76.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.2-3.1-.12-.3-.52-1.52.12-3.16 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0C17.2 5.4 18.17 5.7 18.17 5.7c.64 1.64.24 2.86.12 3.16.75.81 1.2 1.84 1.2 3.1 0 4.43-2.68 5.41-5.24 5.7.43.37.81 1.1.81 2.22v3.29c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                  </svg>
                </a>
                <a href="https://www.instagram.com/royyan.hk/" className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-neutral-400 hover:text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                </a>
                <a href="https://www.linkedin.com/in/royyan-hikmal-kautsar-a406332b0/" className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-neutral-400 hover:text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                </a>
              </div>
            </div>

            {/* Links Column 1 */}
            <div>
              <h4 className="text-white font-semibold mb-4">Explore</h4>
              <ul className="space-y-3 text-sm text-neutral-400">
                <li><a href="#" className="hover:text-white transition-colors">Featured</a></li>
                <li><a href="#" className="hover:text-white transition-colors">New Releases</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Bestsellers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Categories</a></li>
              </ul>
            </div>

            {/* Links Column 2 */}
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-neutral-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-500">
            <p>&copy; 2025 MyBooks. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-neutral-300 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-neutral-300 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-neutral-300 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal isOpen={isOpen} onClose={close} defaultTab={defaultTab} />
    </div>
  );
}
