import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
function Footer() {
  return (
    <>
      <footer className="footer text-white p-10">
        <aside>
          <a className="btn btn-ghost text-xl normal-case bg-text-gradient bg-clip-text text-transparent">
            Internship
          </a>
          <p>
            Interns work under the guidance of experienced professionals, <br />
            allowing them to apply theoretical knowledge in real-world <br />
            scenarios.
          </p>
          <div className="grid grid-cols-4 gap-5">
            <div className="bg-slate-700 hover:bg-text-gradient p-2">
              <FaFacebook />
            </div>
            <div className="bg-slate-700 hover:bg-text-gradient p-2">
              <FaInstagram />
            </div>
            <div className="bg-slate-700 hover:bg-text-gradient p-2">
              <FaTwitter />
            </div>
            <div className="bg-slate-700 hover:bg-text-gradient p-2">
              <FaLinkedin />
            </div>
          </div>
        </aside>
        <nav>
          <h6 className="footer-title">Resources</h6>
          <a className="link link-hover">Support Center</a>
          <a className="link link-hover">Community</a>
          <a className="link link-hover">Join Discord</a>
          <a className="link link-hover">Dashboard</a>
        </nav>
        <nav>
          <h6 className="footer-title">Quick Links</h6>
          <a className="link link-hover">Affiliate Program</a>
          <a className="link link-hover">About Us</a>
          <a className="link link-hover">Latest Post</a>
          <a className="link link-hover">Contact Us</a>
        </nav>
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Email</a>
          <a className="link link-hover">Live Chat</a>
          <a className="link link-hover">Help Center</a>
          <a className="link link-hover">Join Discord</a>
        </nav>
      </footer>
      <div className="divider lg:mx-10"></div>
      <div className="grid lg:grid-cols-2 lg:mx-10">
        <p className="my-2 order-last lg:order-first">
          Copyright © 2024 - All right reserved
        </p>
        <div className="flex lg:flex-row gap-4 lg:justify-end">
          <a>Privacy Policy</a>
          <a>Terms & Conditions</a>
        </div>
      </div>
    </>
  );
}

export default Footer;
