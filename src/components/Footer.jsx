import { FiGithub, FiTwitter, FiInstagram } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center space-x-2">
              <div className="bg-green-500 w-8 h-8 rounded-full flex items-center justify-center">
                <FiGithub className="text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                FILMZI
              </span>
            </div>
            <p className="mt-2 text-gray-400">Your ultimate streaming destination</p>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <FiTwitter className="text-xl" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <FiInstagram className="text-xl" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <FiGithub className="text-xl" />
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Filmzi Streaming Platform. All rights reserved.</p>
          <p className="mt-2">Disclaimer: This is a demo project. All content is for demonstration purposes only.</p>
          <p className="mt-2">Developed by <span className="text-green-400">Zero Creations</span></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
