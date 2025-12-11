import React from 'react';
import { FaHeart, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="relative mt-20 border-t border-white/10 bg-white/5 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand Section */}
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/dashboard" className="text-2xl font-bold text-pink-300 cursor-pointer hover:scale-105 transition-transform inline-block mb-4">
                            💗Soul<span className="text-purple-300">Connect</span>
                        </Link>
                        <p className="text-pink-100/70 text-sm leading-relaxed">
                            Finding your perfect match has never been easier. Join thousands of happy couples who found love on SoulConnect.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4 border-b border-pink-500/30 pb-2 inline-block">Discover</h3>
                        <ul className="space-y-2 text-sm text-pink-100/70">
                            <li><Link to="/discover" className="hover:text-pink-300 transition-colors">Find Matches</Link></li>
                            <li><Link to="/matches" className="hover:text-pink-300 transition-colors">Your Likes</Link></li>
                            <li><Link to="/premium" className="hover:text-yellow-300 transition-colors">Premium Plans</Link></li>
                            <li><Link to="/profile" className="hover:text-pink-300 transition-colors">Edit Profile</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-white font-semibold mb-4 border-b border-pink-500/30 pb-2 inline-block">Support</h3>
                        <ul className="space-y-2 text-sm text-pink-100/70">
                            <li><a href="#" className="hover:text-pink-300 transition-colors">Help Center</a></li>
                            <li><a href="#" className="hover:text-pink-300 transition-colors">Safety Tips</a></li>
                            <li><a href="#" className="hover:text-pink-300 transition-colors">Community Guidelines</a></li>
                            <li><a href="#" className="hover:text-pink-300 transition-colors">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Socials */}
                    <div>
                        <h3 className="text-white font-semibold mb-4 border-b border-pink-500/30 pb-2 inline-block">Connect With Us</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-pink-500 hover:text-white transition-all duration-300 text-pink-200">
                                <FaTwitter />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-pink-500 hover:text-white transition-all duration-300 text-pink-200">
                                <FaInstagram />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-pink-500 hover:text-white transition-all duration-300 text-pink-200">
                                <FaLinkedin />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-pink-500 hover:text-white transition-all duration-300 text-pink-200">
                                <FaGithub />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-white/10 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-xs text-pink-100/50">
                    <p>© {new Date().getFullYear()} SoulConnect. All rights reserved.</p>
                    <p className="flex items-center gap-1 mt-2 md:mt-0">
                        Made with <FaHeart className="text-red-500 animate-pulse" /> for Love
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
