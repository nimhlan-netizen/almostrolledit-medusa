/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Instagram, 
  Youtube, 
  ShoppingCart, 
  Tag, 
  ChevronRight, 
  Menu, 
  X, 
  Play,
  Copy,
  CheckCircle2,
  Mountain
} from 'lucide-react';

// --- Mock Data ---

const SOCIAL_LINKS = [
  { name: 'YouTube', icon: Youtube, url: '#', color: 'hover:text-red-500' },
  { name: 'Instagram', icon: Instagram, url: '#', color: 'hover:text-pink-500' },
  { name: 'TikTok', icon: Play, url: '#', color: 'hover:text-cyan-400' },
];

const LATEST_CONTENT = [
  {
    id: 1,
    title: 'MOAB HELL\'S REVENGE FULL RUN',
    type: 'Video',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
    date: '2 Days Ago',
  },
  {
    id: 2,
    title: 'NEW SUSPENSION SETUP TEST',
    type: 'Post',
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fd?auto=format&fit=crop&q=80&w=800',
    date: '1 Week Ago',
  },
  {
    id: 3,
    title: 'RECOVERING A STUCK BRONCO',
    type: 'Video',
    image: 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&q=80&w=800',
    date: '2 Weeks Ago',
  },
  {
    id: 4,
    title: 'TOP 5 RECOVERY GEAR ESSENTIALS',
    type: 'Article',
    image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=800',
    date: '3 Weeks Ago',
  }
];

const DISCOUNT_CODES = [
  { brand: 'Rugged Radios', code: 'CRAWL15', discount: '15% OFF', description: 'Comms for the trail' },
  { brand: 'Baja Designs', code: 'TRAIL10', discount: '10% OFF', description: 'Premium off-road lighting' },
  { brand: 'Factor 55', code: 'RECOVER10', discount: '10% OFF', description: 'Closed system winching' },
  { brand: 'Falken Tires', code: 'GRIP20', discount: '20% OFF', description: 'Wildpeak A/T & M/T' },
];

const MERCH_ITEMS = [
  { id: 1, name: 'SEND IT TEE', price: '$25', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=600' },
  { id: 2, name: 'TRAIL HAT', price: '$20', image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=600' },
  { id: 3, name: 'RECOVERY HOODIE', price: '$45', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=600' },
];

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-bg-dark/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center gap-2">
            <Mountain className="w-8 h-8 text-brand" />
            <span className="font-display text-2xl tracking-wider uppercase">Almost <span className="text-brand">Rolled It</span></span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#content" className="hover:text-brand transition-colors font-medium text-sm uppercase tracking-wider">Content</a>
              <a href="#discounts" className="hover:text-brand transition-colors font-medium text-sm uppercase tracking-wider">Discounts</a>
              <a href="#merch" className="hover:text-brand transition-colors font-medium text-sm uppercase tracking-wider">Merch</a>
            </div>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-text-main hover:text-brand p-2">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-bg-card border-b border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#content" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium uppercase tracking-wider hover:text-brand">Content</a>
            <a href="#discounts" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium uppercase tracking-wider hover:text-brand">Discounts</a>
            <a href="#merch" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium uppercase tracking-wider hover:text-brand">Merch</a>
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=2000" 
          alt="Rock Crawling Hero" 
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-dark/60 via-bg-dark/80 to-bg-dark"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-brand font-mono text-sm md:text-base tracking-[0.2em] uppercase mb-4">Off-Road & Rock Crawling</p>
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl uppercase leading-[0.85] tracking-tight mb-6">
            Conquer <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand-dark">Every Trail</span>
          </h1>
          <p className="text-text-muted text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light">
            Join the adventure. Weekly trail runs, rig builds, and the best gear recommendations for your next off-road trip.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#content" className="w-full sm:w-auto px-8 py-4 bg-brand hover:bg-brand-dark text-white font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2">
              Watch Latest <Play className="w-5 h-5 fill-current" />
            </a>
            <a href="#merch" className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold uppercase tracking-wider transition-colors backdrop-blur-sm">
              Shop Merch
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const SocialBar = () => {
  return (
    <div className="bg-bg-card border-y border-white/5 py-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16">
        {SOCIAL_LINKS.map((social) => (
          <a 
            key={social.name} 
            href={social.url}
            className={`flex items-center gap-3 text-text-muted transition-colors ${social.color}`}
          >
            <social.icon className="w-8 h-8" />
            <span className="font-display text-xl uppercase tracking-wider hidden sm:block">{social.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

const ContentSection = () => {
  return (
    <section id="content" className="py-24 px-4 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-12">
        <div>
          <h2 className="font-display text-5xl md:text-6xl uppercase tracking-tight">Latest <span className="text-brand">Drops</span></h2>
          <p className="text-text-muted mt-2 font-mono text-sm uppercase tracking-widest">Videos & Builds</p>
        </div>
        <a href="#" className="hidden md:flex items-center gap-1 text-brand hover:text-brand-dark font-bold uppercase tracking-wider transition-colors">
          View All <ChevronRight className="w-5 h-5" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {LATEST_CONTENT.map((item, index) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group cursor-pointer"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-bg-card mb-4">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/90 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="absolute top-4 left-4 bg-brand text-white text-xs font-bold px-2 py-1 uppercase tracking-wider">
                {item.type}
              </div>
              
              {item.type === 'Video' && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 bg-brand/90 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Play className="w-8 h-8 text-white fill-current ml-1" />
                  </div>
                </div>
              )}
            </div>
            <p className="text-text-muted font-mono text-xs mb-2">{item.date}</p>
            <h3 className="font-display text-2xl uppercase leading-tight group-hover:text-brand transition-colors">{item.title}</h3>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-8 md:hidden flex justify-center">
        <a href="#" className="flex items-center gap-1 text-brand font-bold uppercase tracking-wider">
          View All Content <ChevronRight className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
};

const DiscountCodeCard = ({ item }: { item: typeof DISCOUNT_CODES[0] }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(item.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-bg-card border border-white/5 p-6 relative overflow-hidden group hover:border-brand/50 transition-colors">
      {/* Decorative background element */}
      <div className="absolute -right-10 -top-10 text-white/5 group-hover:text-brand/5 transition-colors">
        <Tag className="w-40 h-40" />
      </div>
      
      <div className="relative z-10">
        <h3 className="font-display text-3xl uppercase mb-1">{item.brand}</h3>
        <p className="text-text-muted text-sm mb-6">{item.description}</p>
        
        <div className="flex items-center gap-4">
          <div className="bg-bg-dark border border-white/10 px-4 py-3 flex-1 flex items-center justify-between font-mono">
            <span className="text-brand font-bold text-lg">{item.code}</span>
            <span className="text-xs text-text-muted uppercase tracking-wider">{item.discount}</span>
          </div>
          <button 
            onClick={handleCopy}
            className="bg-white/10 hover:bg-brand text-white p-3 transition-colors flex-shrink-0"
            title="Copy Code"
          >
            {copied ? <CheckCircle2 className="w-6 h-6 text-green-400" /> : <Copy className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </div>
  );
};

const DiscountsSection = () => {
  return (
    <section id="discounts" className="py-24 bg-bg-card/50 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl md:text-6xl uppercase tracking-tight mb-4">Partner <span className="text-brand">Discounts</span></h2>
          <p className="text-text-muted max-w-2xl mx-auto">Use these codes at checkout to save on the best off-road gear and support the channel.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {DISCOUNT_CODES.map((item, index) => (
            <motion.div
              key={item.brand}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <DiscountCodeCard item={item} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const MerchSection = () => {
  return (
    <section id="merch" className="py-24 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <h2 className="font-display text-5xl md:text-6xl uppercase tracking-tight">Official <span className="text-brand">Merch</span></h2>
          <p className="text-text-muted mt-2 font-mono text-sm uppercase tracking-widest">Rep the crew</p>
        </div>
        <a href="#" className="inline-flex items-center justify-center gap-2 bg-white text-bg-dark px-6 py-3 font-bold uppercase tracking-wider hover:bg-brand hover:text-white transition-colors">
          <ShoppingCart className="w-5 h-5" /> Shop All
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {MERCH_ITEMS.map((item, index) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group"
          >
            <div className="bg-bg-card aspect-square mb-4 relative overflow-hidden flex items-center justify-center p-8">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover mix-blend-luminosity opacity-80 group-hover:mix-blend-normal group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-brand/50 transition-colors pointer-events-none m-4"></div>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-display text-2xl uppercase">{item.name}</h3>
                <p className="text-text-muted font-mono">{item.price}</p>
              </div>
              <button className="text-brand hover:text-white transition-colors p-2 bg-brand/10 hover:bg-brand rounded-full">
                <ShoppingCart className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-bg-card border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Mountain className="w-8 h-8 text-brand" />
              <span className="font-display text-3xl tracking-wider uppercase">Almost <span className="text-brand">Rolled It</span></span>
            </div>
            <p className="text-text-muted max-w-md mb-8">
              Dedicated to the off-road lifestyle. Exploring the toughest trails, building capable rigs, and sharing the adventure with the community.
            </p>
            <div className="flex gap-4">
              {SOCIAL_LINKS.map((social) => (
                <a key={social.name} href={social.url} className="w-10 h-10 bg-bg-dark flex items-center justify-center rounded-full text-text-muted hover:text-brand hover:bg-white/5 transition-all">
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-display text-xl uppercase mb-6">Quick Links</h4>
            <ul className="space-y-3 text-text-muted">
              <li><a href="#content" className="hover:text-brand transition-colors">Latest Content</a></li>
              <li><a href="#discounts" className="hover:text-brand transition-colors">Partner Discounts</a></li>
              <li><a href="#merch" className="hover:text-brand transition-colors">Merch Store</a></li>
              <li><a href="#" className="hover:text-brand transition-colors">Rig Build Specs</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display text-xl uppercase mb-6">Newsletter</h4>
            <p className="text-text-muted text-sm mb-4">Get the latest trail reports and exclusive discount codes.</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="bg-bg-dark border border-white/10 px-4 py-2 w-full font-mono text-sm focus:outline-none focus:border-brand"
              />
              <button type="submit" className="bg-brand hover:bg-brand-dark text-white px-4 py-2 font-bold uppercase tracking-wider transition-colors">
                Join
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-text-muted text-sm font-mono">
          <p>&copy; {new Date().getFullYear()} ALMOST ROLLED IT. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">PRIVACY</a>
            <a href="#" className="hover:text-white transition-colors">TERMS</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen selection:bg-brand selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <SocialBar />
        <ContentSection />
        <DiscountsSection />
        <MerchSection />
      </main>
      <Footer />
    </div>
  );
}
