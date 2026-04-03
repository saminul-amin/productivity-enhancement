const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-700 py-4">
        <hr className="max-w-5xl mx-auto mb-2" />
      <div className="container mx-auto px-4 flex flex-col md:flex-col justify-between items-center gap-4">
        <div className="text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Productivity Enhancement Community | All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
