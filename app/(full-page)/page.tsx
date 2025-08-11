'use client';
/* eslint-disable @next/next/no-img-element */
import React, { useContext, useRef, useState } from 'react';
import Link from 'next/link';
import { StyleClass } from 'primereact/styleclass';
import { Button } from 'primereact/button';
import { Ripple } from 'primereact/ripple';
import { LayoutContext } from '@/layout/context/layoutcontext';
import { NodeRef } from '@/types';
import { classNames } from 'primereact/utils';
import { useRouter } from 'next/navigation';
import Footer from '../components/footer';

const LandingPage = () => {
  const [isHidden, setIsHidden] = useState(false);
  const { layoutConfig } = useContext(LayoutContext);
  const menuRef = useRef<HTMLElement | null>(null);
  const router = useRouter();

  const C = {
    primary: '#0b7dda',
    secondary: '#f0f4f8',
    textPrimary: '#101a23',
    textSecondary: '#5a6b79',
    border: '#e2e8f0',
  };

  const toggleMenuItemClick = () => setIsHidden((p) => !p);

  return (
    <div className="surface-0 flex justify-content-center">
      <div id="home" className="landing-wrapper overflow-hidden w-full">
        {/* Header */}
        <header className="surface-0 sticky top-0 z-5 border-bottom-1 surface-border">
          <nav className="px-3 md:px-4 lg:px-5 flex align-items-center justify-content-between" style={{ height: 56 }}>
            <Link href="/" className="flex items-center whitespace-nowrap flex-shrink-0">
  <span className="text-900 font-bold text-lg">PAW-AI</span>
</Link>

            <StyleClass nodeRef={menuRef as NodeRef} selector="@next" enterClassName="hidden" leaveToClassName="hidden" hideOnOutsideClick>
              <i ref={menuRef} className="pi pi-bars text-2xl cursor-pointer block lg:hidden text-700" />
            </StyleClass>

            <div
              className={classNames(
                'align-items-center surface-0 flex-grow-1 justify-content-end hidden lg:flex absolute lg:static w-full left-0 px-3 lg:px-0 z-2',
                { hidden: isHidden }
              )}
              style={{ top: '100%' }}
            >
              <ul className="list-none p-0 m-0 flex lg:align-items-center select-none flex-column lg:flex-row cursor-pointer mr-3">
                <li>
                  <a href="#features" onClick={toggleMenuItemClick} className="p-ripple flex px-0 py-2 text-700">
                    <span>Product</span>
                    <Ripple />
                  </a>
                </li>
                <li>
                  <a href="#testimonials" onClick={toggleMenuItemClick} className="p-ripple flex px-0 py-2 text-700 lg:ml-4">
                    <span>Customers</span>
                    <Ripple />
                  </a>
                </li>
                <li>
                  <a href="#cta" onClick={toggleMenuItemClick} className="p-ripple flex px-0 py-2 text-700 lg:ml-4">
                    <span>Get Started</span>
                    <Ripple />
                  </a>
                </li>
              </ul>

              <div className="flex align-items-center">
                <Button
                  label="Login"
                  text
                  rounded
                  className="border-none line-height-2 mr-2"
                  style={{ color: C.primary, padding: '0.45rem 0.9rem' }}
                  onClick={() => router.push('/auth/login')}
                />
                <Button
                  label="Register"
                  rounded
                  className="border-none text-white"
                  style={{ background: C.primary, padding: '0.45rem 0.9rem' }}
                  onClick={() => router.push('/auth/register')}
                />
              </div>
            </div>
          </nav>
        </header>

        {/* HERO — two-column flex, always side-by-side on md+ */}
        <section
          id="hero"
          className="px-3 md:px-4 lg:px-6"
          style={{
            background:
              'linear-gradient(0deg, rgba(255,255,255,.85), rgba(255,255,255,.85)), radial-gradient(120% 160% at 80% 10%, #E7F0FF 0%, #F5FAFF 30%, #F0F4F8 100%)',
            minHeight: '82vh',
            display: 'flex',
            alignItems: 'center',
            paddingTop: '2.5rem',
            paddingBottom: '2.5rem',
          }}
        >
          <div
            className="flex flex-column md:flex-row align-items-center mx-auto"
            style={{ maxWidth: 1160, gap: '2rem', width: '100%' }}
          >
            {/* Left: Text */}
            <div style={{ flex: '1 1 0%', minWidth: 0 }}>
              <h1 className="m-0 text-4xl md:text-5xl font-bold text-900 line-height-2">
                Unlock Insights from Your Financial Records with AI
              </h1>
              <p className="mt-3 text-lg" style={{ color: C.textSecondary }}>
                Upload end-year reports, get instant AI-powered insights, and chat with your data in real time.
                Turn raw statements into dashboards, answers, and decisions.
              </p>

              <ul className="list-none p-0 m-0 mt-3">
                <li className="flex align-items-center mb-2">
                  <i className="pi pi-check-circle mr-2" style={{ color: C.primary }} />
                  <span>Automatic data extraction from PDFs/Excel</span>
                </li>
                <li className="flex align-items-center mb-2">
                  <i className="pi pi-check-circle mr-2" style={{ color: C.primary }} />
                  <span>Ask natural-language questions about your numbers</span>
                </li>
                <li className="flex align-items-center">
                  <i className="pi pi-check-circle mr-2" style={{ color: C.primary }} />
                  <span>Shareable dashboards for teams & boards</span>
                </li>
              </ul>

              <div className="flex flex-column md:flex-row gap-3 mt-4">
                <Button
                  label="Get Started Free"
                  rounded
                  className="border-none text-white text-base px-4"
                  style={{ background: C.primary }}
                  onClick={() => router.push('/auth/register')}
                />
                <Button
                  label="Learn More"
                  rounded
                  outlined
                  className="text-base px-4"
                  style={{ borderColor: C.primary, color: C.primary }}
                  onClick={() => router.push('/about')}
                />
              </div>

              <div className="mt-4 text-600 text-sm">Trusted by SACCOs and finance teams across Kenya.</div>
            </div>

            {/* Right: Image */}
            <div style={{ flex: '1 1 0%', minWidth: 0 }}>
              <div
                className="border-1 border-round-2xl overflow-hidden shadow-2"
                style={{ borderColor: C.border, width: '100%' }}
              >
                <div
                  style={{
                    width: '100%',
                    aspectRatio: '16/10',
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDJkmQ8Ipi0cBtyZwDLCEzkDNJQ-dRs3L4ipN2m2HwhbjWtZvRYfTiUE7bKE4jnhb28swUPzkQX1uOszkKgbRzqBM-3t_lE7426JIwVYLvgp4h1R5ow4A6XD9GFwv7Zna1YZJaYZTzd6eBq4HQRs746bo4ncVtMslbpwHbq4nCMaJ_X08WrgmmagZSi81KOgP1qrHktEE_eeryDJAY6Dioor9Xya14TaRYRO881dj18pAOUQKLTNztjybK0wB1zIMXhgvHvJFyHh4o")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-8 px-3 md:px-4 lg:px-6" style={{ background: C.secondary }}>
          <div className="text-center mx-auto" style={{ maxWidth: 840 }}>
            <h2 className="text-3xl md:text-4xl font-bold text-900 m-0">Key Features</h2>
            <p className="mt-2 text-lg" style={{ color: C.textSecondary }}>
              Explore the powerful capabilities of our AI-driven financial analysis tool.
            </p>
          </div>

          <div className="grid mt-4">
            <div className="col-12 md:col-4">
              <div className="p-4 surface-card border-1 border-round-lg shadow-1" style={{ borderColor: C.border }}>
                <div className="flex align-items-center justify-content-center mb-3 border-round" style={{ width: '3rem', height: '3rem', color: C.primary, background: '#eaf4ff' }}>
                  <i className="pi pi-file text-xl" />
                </div>
                <h3 className="text-xl font-bold text-900 mb-2">AI Data Extraction</h3>
                <p className="m-0" style={{ color: C.textSecondary }}>Automatically process financial statements with advanced AI.</p>
              </div>
            </div>

            <div className="col-12 md:col-4">
              <div className="p-4 surface-card border-1 border-round-lg shadow-1" style={{ borderColor: C.border }}>
                <div className="flex align-items-center justify-content-center mb-3 border-round" style={{ width: '3rem', height: '3rem', color: C.primary, background: '#eaf4ff' }}>
                  <i className="pi pi-comments text-xl" />
                </div>
                <h3 className="text-xl font-bold text-900 mb-2">Interactive Chat</h3>
                <p className="m-0" style={{ color: C.textSecondary }}>Ask questions and get instant answers from your data in real time.</p>
              </div>
            </div>

            <div className="col-12 md:col-4">
              <div className="p-4 surface-card border-1 border-round-lg shadow-1" style={{ borderColor: C.border }}>
                <div className="flex align-items-center justify-content-center mb-3 border-round" style={{ width: '3rem', height: '3rem', color: C.primary, background: '#eaf4ff' }}>
                  <i className="pi pi-chart-line text-xl" />
                </div>
                <h3 className="text-xl font-bold text-900 mb-2">Insightful Dashboards</h3>
                <p className="m-0" style={{ color: C.textSecondary }}>Visualize trends and KPIs with clean, customizable dashboards.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-8 px-3 md:px-4 lg:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-900 text-center mb-4">What Our Users Say</h2>
          <div className="grid">
            {[
              { quote: 'This tool has revolutionized how we analyze our financial data. The insights are incredibly valuable.', name: 'Sarah K.', role: 'SACCO Manager' },
              { quote: 'The interactive chat feature is a game-changer. I can get answers to complex questions in seconds.', name: 'David O.', role: 'Accountant' },
              { quote: 'The dashboards provide a clear and concise overview of our performance. Highly recommended.', name: 'Emily M.', role: 'Business Owner' },
            ].map((t, i) => (
              <div key={i} className="col-12 md:col-4">
                <div className="p-4 surface-card border-1 border-round-lg shadow-1 h-full flex flex-column" style={{ borderColor: C.border }}>
                  <p className="text-lg mb-4" style={{ color: C.textPrimary }}>“{t.quote}”</p>
                  <div className="flex align-items-center mt-auto">
                    <div className="mr-3 border-circle" style={{ width: 44, height: 44, background: C.secondary }} />
                    <div>
                      <p className="m-0 font-bold text-900">{t.name}</p>
                      <p className="m-0 text-sm" style={{ color: C.textSecondary }}>{t.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section id="cta" className="py-5 px-3 md:px-4 lg:px-6 text-center" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f0f4f8 100%)' }}>
          <div className="mx-auto" style={{ maxWidth: 760 }}>
            <h2 className="text-3xl md:text-4xl font-bold text-900">Ready to Transform Your Financial Analysis?</h2>
            <p className="text-lg mt-2 mb-4" style={{ color: C.textSecondary }}>
              Join professionals using AI to gain deeper insights and make better decisions.
            </p>
            <div className="flex gap-3 justify-content-center">
              <Button
                label="Get Started Free"
                rounded
                className="border-none text-white text-base px-4"
                style={{ background: C.primary }}
                onClick={() => router.push('/auth/register')}
              />
              <Button
                label="Login"
                rounded
                outlined
                className="text-base px-4"
                style={{ borderColor: C.primary, color: C.primary }}
                onClick={() => router.push('/auth/login')}
              />
            </div>
          </div>
        </section>
        <Footer/>
      </div>
    </div>
  );
};

export default LandingPage;
