"use client";

import { useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { seededRandom } from "@/utils/random";



const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  top: `${seededRandom(i * 4) * 100}%`,
  left: `${seededRandom(i * 4 + 1) * 100}%`,
  animationDelay: `${seededRandom(i * 4 + 2) * 20}s`,
  width: `${seededRandom(i * 4 + 3) * 5 + 2}px`,
  height: `${seededRandom(i * 4 + 3.5) * 5 + 2}px`,
  background: i % 2 === 0 ? '#d4af37' : 'white',
}));

export default function Home() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Fade Up Animation
    gsap.utils.toArray<HTMLElement>('.reveal-up').forEach(element => {
      gsap.fromTo(element,
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    });

    // Staggered Fade Up
    gsap.utils.toArray<HTMLElement>('.stagger-parent').forEach(parent => {
      const children = parent.children;
      gsap.fromTo(children,
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: parent,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    });

    // Text Reveal - Fixed 'y' clipping with 115% clip-path
    gsap.utils.toArray<HTMLElement>('.reveal-text-header').forEach(element => {
      gsap.fromTo(element,
        { clipPath: "polygon(0 0, 0 0, 0 115%, 0 115%)", opacity: 0 },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 115%, 0 115%)",
          opacity: 1,
          duration: 1.5,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: element,
            start: "top 90%"
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <main className="flex-1 bg-white">
      {/* Premium Hero Section */}
      <section id="home" className="relative hero-gradient min-h-screen flex items-center justify-center overflow-hidden border-b-[10px] border-gold-500/20">
        <div className="absolute inset-0 z-0 opacity-40">
          {PARTICLES.map((style, i) => (
            <div
              key={i}
              className="particle"
              style={style}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center flex flex-col items-center">
          <div className="reveal-up mb-8">
            <div className="w-28 h-28 mx-auto mb-8 relative">
              <div className="absolute inset-0 bg-gold-500 blur-3xl opacity-20 animate-pulse"></div>
              <Image src="/img/logo.png" alt="NaiyeBharat Logo" width={112} height={112} className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]" />
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-9xl font-serif font-bold tracking-tighter brand-gradient mb-2 reveal-text-header py-4">
              NaiyeBharat
            </h1>
          </div>

          <h2 className="reveal-text text-xl md:text-2xl font-sans text-gold-400 mb-8 tracking-[0.4em] uppercase font-bold">
            Excellence In Legal Advocacy
          </h2>

          <p className="reveal-up text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
            We provide comprehensive legal solutions with integrity, expertise, and dedication.
            Protecting your rights and delivering justice for over two decades.
          </p>

          <div className="reveal-up flex flex-col sm:flex-row gap-6 relative">
            <Link href="/counseling" className="group relative overflow-hidden bg-gold-500 text-oxford-900 px-6 py-4 sm:px-12 sm:py-5 rounded-full font-bold tracking-widest uppercase transition-all shadow-gold hover:scale-105 active:scale-95 text-[10px] sm:text-base">
              <span className="relative z-10 transition-colors group-hover:text-white">Book Consultation</span>
              <div className="absolute inset-0 bg-oxford-800 transform translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
            </Link>
            <Link href="/counselling" className="bg-transparent border-2 border-white/30 text-white px-6 py-4 sm:px-12 sm:py-5 rounded-full font-bold tracking-widest uppercase hover:bg-white hover:text-oxford-900 transition-all backdrop-blur-sm text-[10px] sm:text-base text-center">
              Mental Health Support
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Statistics */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-12 stagger-parent text-center">
            {[
              { label: "Years Experience", value: "20+" },
              { label: "Cases Handled", value: "2000+" },
              { label: "Satisfaction Rate", value: "95%" },
              { label: "Public Reviews", value: "500+" }
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <div className="text-4xl md:text-6xl font-serif font-bold text-oxford-800">{stat.value}</div>
                <div className="text-gold-600 font-bold uppercase tracking-widest text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Distinguished Advocates - Details Reveal on Hover */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-24 reveal-up">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold text-oxford-900 mb-6 font-playfair">Distinguished Advocates</h2>
            <p className="text-slate-400 text-xl max-w-2xl mx-auto italic font-serif">&quot;Expert legal minds dedicated to your pursuit of justice.&quot;</p>
            <div className="w-24 h-1 bg-gold-500 mx-auto mt-8"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-12 stagger-parent">
            {[
              {
                name: "Adv. Praveen Kumar Singh",
                specialty: "Criminal Litigation & Disputes",
                experience: "25+ Years Experience",
                image: "/img/adv-praveen-singh.jpg"
              },
              {
                name: "Adv. Ranvijay Singh",
                specialty: "Legal Documentation & Compliance",
                experience: "5+ Years Experience",
                image: "/img/adv-ranvijay-singh.jpeg"
              },
              {
                name: "Adv. Sharda Singh",
                specialty: "Family & Matrimonial Matters",
                experience: "15+ Years Experience",
                image: "/img/adv-sharda-singh.jpg"
              }
            ].map((advocate, idx) => (
              <div key={idx} className="group bg-white rounded-[40px] overflow-hidden shadow-oxford border border-slate-50 transition-all duration-700 hover:-translate-y-4 flex flex-col">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <Image
                    src={advocate.image}
                    alt={advocate.name}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 object-top"
                  />
                  <div className="absolute top-6 left-6">
                    <div className="px-4 py-1.5 bg-oxford-900/80 text-gold-400 font-bold text-[10px] uppercase tracking-widest backdrop-blur-md rounded-full border border-white/10">
                      {advocate.experience}
                    </div>
                  </div>
                </div>

                <div className="p-10 flex flex-col flex-1">
                  <h3 className="text-2xl font-serif font-bold text-oxford-900 mb-2">{advocate.name}</h3>
                  <div className="w-12 h-1 bg-gold-500 mb-6 transition-all duration-500 group-hover:w-full"></div>
                  <p className="text-slate-500 font-medium text-[10px] tracking-[0.2em] uppercase mt-auto">
                    {advocate.specialty}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Contact Section - Simple & Effective */}
      <section id="Contact" className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">

          <div className="text-center mb-24 reveal-up">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold text-oxford-900 tracking-tight mb-8">Get in Touch</h2>
            <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto font-light">
              Contact us today for a consultation regarding your legal needs.
            </p>
            <div className="w-24 h-1 bg-gold-500 mx-auto mt-8"></div>
          </div>

          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">

            {/* Left Column: Contact Information */}
            <div className="space-y-8 stagger-parent">
              <h3 className="text-2xl font-serif font-bold text-oxford-800 mb-10 pl-4 border-l-4 border-gold-500">Contact Details</h3>

              {[
                { icon: "fa-location-dot", label: "Address", val: "Chamber No. 701, Saket District Court, New Delhi - 110017" },
                { icon: "fa-phone", label: "Phone", val: "+91 85120 05097" },
                { icon: "fa-envelope", label: "Email", val: "naiyebharat@gmail.com" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 sm:gap-8 bg-white p-5 sm:p-8 rounded-3xl border border-slate-100 shadow-sm group hover:shadow-md transition-all duration-500">
                  <div className="w-16 h-16 rounded-2xl bg-oxford-900 flex items-center justify-center text-gold-500 text-2xl shrink-0 group-hover:scale-110 transition-transform">
                    <i className={`fas ${item.icon}`}></i>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-gold-600 mb-1">{item.label}</h4>
                    <p className="text-oxford-900 font-serif font-bold text-xl">{item.val}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column: Standard Form */}
            <div id="contact-form-container" className="reveal-up">
              <div className="bg-white p-6 sm:p-10 md:p-14 rounded-[40px] shadow-oxford border border-slate-100 relative">
                <h3 className="text-2xl font-serif font-bold text-oxford-900 mb-8 pl-4 border-l-4 border-gold-500">Send Us a Message</h3>

                <form
                  className="space-y-6"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const container = document.getElementById('contact-form-container');
                    if (container) {
                      container.innerHTML = `
                        <div class="h-full flex flex-col items-center justify-center text-center py-20 animate-in fade-in zoom-in duration-700 bg-white rounded-[40px] shadow-oxford border border-slate-50">
                          <div class="w-20 h-20 bg-gold-500 rounded-full flex items-center justify-center text-oxford-900 text-3xl mb-8 shadow-gold">
                            <i class="fas fa-check"></i>
                          </div>
                          <h3 class="text-3xl font-serif font-bold text-oxford-900 mb-4">Message Sent</h3>
                          <p class="text-slate-500 max-w-sm mb-10 px-6">Thank you for reaching out. We have received your inquiry and will contact you shortly.</p>
                          <button onclick="window.location.reload()" class="text-gold-600 font-bold uppercase tracking-widest text-[10px] border-b border-gold-600 pb-1">Send Another Message</button>
                        </div>
                      `;
                    }
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-4">Full Name</label>
                      <input required type="text" placeholder="Your Name" className="case-input" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-4">Email</label>
                      <input required type="email" placeholder="example@gmail.com" className="case-input" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-4">Phone Number</label>
                      <input required type="tel" placeholder="+91 00000 00000" className="case-input" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-4">Occupation</label>
                      <input type="text" placeholder="Your Title" className="case-input" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1 relative">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-4">Select Category</label>
                      <select required className="case-input appearance-none cursor-pointer w-full">
                        <option value="">Inquiry Type</option>
                        <option>Civil Litigation</option>
                        <option>Criminal Defense</option>
                        <option>Corporate Law</option>
                        <option>Family & Matrimonial</option>
                      </select>
                      <div className="absolute right-6 top-[2.8rem] pointer-events-none text-gold-500">
                        <i className="fas fa-chevron-down text-xs"></i>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-4">Subject</label>
                      <input required type="text" placeholder="General Subject" className="case-input" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-4">Your Message</label>
                    <textarea required rows={4} placeholder="How can we help you?" className="case-input resize-none"></textarea>
                  </div>

                  <button type="submit" className="group relative w-full py-6 bg-oxford-900 text-gold-400 font-bold border border-gold-500/20 rounded-2xl text-center shadow-2xl transition-all uppercase tracking-[0.2em] text-[10px] overflow-hidden block hover:scale-[1.02] active:scale-95">
                    <span className="relative z-10 transition-colors group-hover:text-oxford-900">Send Message Now</span>
                    <div className="absolute inset-0 bg-gold-500 transform translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Reviews Section (Single Row Organic) */}
      <section className="py-32 bg-white overflow-hidden relative">
        <div className="container mx-auto px-4 sm:px-6 mb-20 text-center reveal-up">
          <div className="inline-block px-4 py-1.5 bg-slate-50 border border-slate-100 rounded-full text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-6">
            Elite Legal Network Verified
          </div>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-oxford-900 mb-6 tracking-tight">Voices of Integrity</h2>
          <div className="w-20 h-1 bg-gold-500 mx-auto"></div>
        </div>

        <div className="flex flex-col gap-10 pause-on-hover">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...reviews, ...reviews, ...reviews].map((review, i) => (
              <ReviewCard key={i} {...review} />
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}

const reviews = [
  { name: "Brijmohan Singh", handle: "Verified Client", date: "June 2025", text: "कानूनी सहायता के साथ-साथ मानसिक सहयोग भी मिलता है, जो इसे दूसरों से अलग बनाता है।", img: "https://i.pravatar.cc/100?u=brij" },
  { name: "Sheela Kumari", handle: "Verified Client", date: "May 2025", text: "मुझे यहाँ सही समय पर सही सलाह मिली। टीम बहुत सहयोगी और समझदार है।", img: "https://i.pravatar.cc/100?u=sheela" },
  { name: "Rahul Kapoor", handle: "Verified Client", date: "June 2025", text: "Professionalism at its best. Their corporate law team handled our startup registration flawlessly.", img: "https://i.pravatar.cc/100?u=rahul" },
  { name: "Abhi Ojha", handle: "Verified Client", date: "May 2025", text: "Expertise you can trust. Clear communication and surgical legal strategy.", img: "https://i.pravatar.cc/100?u=abhi" },
  { name: "Priyanka Verma", handle: "Verified Client", date: "June 2025", text: "The cross-over between legal advice and mental health support is brilliant and deeply empathetic.", img: "https://i.pravatar.cc/100?u=priyanka" }
];

interface Review {
  name: string;
  handle: string;
  date: string;
  text: string;
  img: string;
}

function ReviewCard({ name, handle, date, text, img }: Review) {
  return (
    <div className="flex-shrink-0 w-[85vw] max-w-[500px] mx-3 sm:mx-5 bg-white p-8 md:p-12 rounded-[40px] border border-slate-100 shadow-oxford whitespace-normal group hover:border-gold-500/20 transition-all duration-500 relative">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="relative">
            <Image src={img} width={80} height={80} className="w-20 h-20 rounded-[2rem] object-cover shadow-lg" alt={name} />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gold-500 rounded-xl flex items-center justify-center text-white text-xs border-4 border-white shadow-md">
              <i className="fas fa-check"></i>
            </div>
          </div>
          <div>
            <div className="font-serif font-bold text-oxford-900 text-xl leading-tight">{name}</div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gold-600">{handle}</span>
              <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{date}</span>
            </div>
          </div>
        </div>
        <div className="text-3xl text-slate-100 group-hover:text-gold-500/10 transition-colors duration-500">
          <i className="fas fa-quote-right"></i>
        </div>
      </div>
      <p className="text-slate-600 text-lg leading-relaxed font-light italic">
        &quot;{text}&quot;
      </p>
    </div>
  );
}
