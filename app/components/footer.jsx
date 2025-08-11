export default function Footer() {
    return (
        <footer className="surface-0 text-white pt-6 pb-4 mt-6">
            <div className="px-3 md:px-4 lg:px-6 mx-auto" style={{ maxWidth: 1160 }}>
                <div className="grid">
                    {/* Brand + Description */}
                    <div className="col-12 md:col-4 mb-4 md:mb-0">
                        <h3 className="text-2xl font-bold mb-2">PAW-AI</h3>
                        <p className="text-sm line-height-3 text-900">AI-powered financial analysis platform for SACCOs, accountants, and business owners. Upload, extract, visualize, and chat with your data.</p>
                    </div>

                    {/* Quick Links */}
                    <div className="col-6 md:col-2 mb-4 md:mb-0">
                        <h4 className="text-lg font-semibold mb-3">Product</h4>
                        <ul className="list-none p-0 m-0 text-sm line-height-3">
                            <li>
                                <a href="#features" className="text-900">
                                    Features
                                </a>
                            </li>
                            <li>
                                <a href="#testimonials" className="text-900">
                                    Customers
                                </a>
                            </li>
                            <li>
                                <a href="#cta" className="text-900">
                                    Get Started
                                </a>
                            </li>
                            <li>
                                <a href="/pricing" className="text-900">
                                    Pricing
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="col-6 md:col-2 mb-4 md:mb-0">
                        <h4 className="text-lg font-semibold mb-3">Company</h4>
                        <ul className="list-none p-0 m-0 text-sm line-height-3">
                            <li>
                                <a href="/about" className="text-900">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="/careers" className="text-900">
                                    Careers
                                </a>
                            </li>
                            <li>
                                <a href="/contact" className="text-900">
                                    Contact
                                </a>
                            </li>
                            <li>
                                <a href="/blog" className="text-900">
                                    Blog
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="col-12 md:col-4">
                        <h4 className="text-lg font-semibold mb-3">Support</h4>
                        <ul className="list-none p-0 m-0 text-sm line-height-3">
                            <li>
                                <a href="/help" className="text-900">
                                    Help Center
                                </a>
                            </li>
                            <li>
                                <a href="/faq" className="text-900">
                                    FAQs
                                </a>
                            </li>
                            <li>
                                <a href="/terms" className="text-900">
                                    Terms of Service
                                </a>
                            </li>
                            <li>
                                <a href="/privacy" className="text-900">
                                    Privacy Policy
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <hr className="my-4 border-top-1 border-300" />

                {/* Bottom Bar */}
                <div className="flex flex-column md:flex-row align-items-center justify-content-between text-900 text-sm">
                    <p className="m-0">&copy; {new Date().getFullYear()} PAW-AI. All rights reserved.</p>
                    <div className="flex gap-3 mt-3 md:mt-0">
                        <a href="#" className="hover:text-white">
                            <i className="pi pi-facebook"></i>
                        </a>
                        <a href="#" className="hover:text-white">
                            <i className="pi pi-twitter"></i>
                        </a>
                        <a href="#" className="hover:text-white">
                            <i className="pi pi-linkedin"></i>
                        </a>
                        <a href="#" className="hover:text-white">
                            <i className="pi pi-github"></i>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
