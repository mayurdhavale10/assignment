'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

export default function Home() {
  const animationContainerRef = useRef<HTMLDivElement>(null);
  const animationInstanceRef = useRef<{ destroy: () => void } | null>(null);

  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined' && animationContainerRef.current) {
      const container = animationContainerRef.current;
      
      // Function to load and initialize Lottie
      const initLottie = () => {
        if (window.lottie && container) {
          // Clear any existing animation first
          if (animationInstanceRef.current) {
            animationInstanceRef.current.destroy();
            animationInstanceRef.current = null;
          }
          
          // Clear the container
          container.innerHTML = '';
          
          // Create new animation
          animationInstanceRef.current = window.lottie.loadAnimation({
            container: container,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: '/Analytics Character Animation.json'
          });
        }
      };

      // Check if Lottie is already loaded
      if (window.lottie) {
        initLottie();
      } else {
        // Load Lottie script dynamically
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js';
        script.onload = initLottie;
        script.onerror = () => {
          console.warn('Failed to load Lottie animation');
        };
        document.head.appendChild(script);
      }

      // Cleanup function
      return () => {
        if (animationInstanceRef.current) {
          animationInstanceRef.current.destroy();
          animationInstanceRef.current = null;
        }
        if (container) {
          container.innerHTML = '';
        }
      };
    }
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gray-100 dark:bg-gray-800 rounded-full blur-2xl opacity-50"></div>
        <div className="absolute bottom-32 right-20 w-40 h-40 bg-gray-100 dark:bg-gray-800 rounded-full blur-2xl opacity-30"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Image
                src="/uzence_design_studio_logo.webp"
                alt="Uzence Design Studio logo"
                width={36}
                height={36}
                className="rounded-lg shadow-sm"
                priority
              />
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
              Uzence Design Studio
            </h1>
          </div>

          <Link
            href="/examples"
            className="group inline-flex items-center gap-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 shadow-sm transition-all duration-200"
            aria-label="Open interactive examples"
          >
            <span>Open Examples</span>
            <span className="transform group-hover:translate-x-0.5 transition-transform duration-200" aria-hidden>→</span>
          </Link>
        </header>

        {/* Main Content */}
        <section className="space-y-6">
          {/* Hero Description with Animation - More Compact */}
          <div className="grid lg:grid-cols-5 gap-6 items-center">
            <div className="lg:col-span-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
              <p className="text-xl leading-relaxed text-gray-700 dark:text-gray-300">
                A tiny, typed component set built with{' '}
                <strong className="text-gray-900 dark:text-white">React + TypeScript</strong>, styled with{' '}
                <strong className="text-gray-900 dark:text-white">Tailwind</strong>, documented with{' '}
                <strong className="text-gray-900 dark:text-white">Storybook</strong>, and tested with{' '}
                <strong className="text-gray-900 dark:text-white">Vitest</strong>.
              </p>
            </div>
            
            {/* Animation Container - More Compact */}
            <div className="lg:col-span-2 flex justify-center">
              <div 
                ref={animationContainerRef} 
                className="w-64 h-64"
                aria-label="Analytics animation"
              />
            </div>
          </div>

          {/* Components Showcase - More Compact and Symmetrical */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* InputField Component Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-gray-900/20 transition-all duration-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-600 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">InputField</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    Flexible text input with variants, sizes, and states for all your form needs.
                  </p>
                </div>
              </div>
            </div>

            {/* DataTable Component Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-gray-900/20 transition-all duration-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-600 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 6h18m-9 8h9m-9 4h9m-9-8V6a2 2 0 012-2h4a2 2 0 012 2v4" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">DataTable</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    Sortable and selectable table with loading and empty states built-in.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action - More Compact */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              href="/examples"
              className="inline-flex items-center justify-center rounded-lg bg-gray-900 dark:bg-gray-700 px-6 py-3 text-white font-medium hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              <span className="mr-2">Try the Examples</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            
            <a
              href="https://github.com/mayurdhavale10/assignment"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-6 py-3 text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
              </svg>
              <span>View Source</span>
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}

// Add type declaration for window.lottie
declare global {
  interface Window {
    lottie?: {
      loadAnimation: (params: {
        container: HTMLElement;
        renderer: string;
        loop: boolean;
        autoplay: boolean;
        path: string;
      }) => { destroy: () => void };
    };
  }
}