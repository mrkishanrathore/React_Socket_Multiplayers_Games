import './Footer.css';

const Footer = () => {
  return (
    <footer className={"footer"}>
      <div className={"footerContent"}>
        <div className={"footerColumn"}>
          <h3>About Us</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div className={"footerColumn"}>
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div className={"footerColumn"}>
          <h3>Contact Us</h3>
          <p>123 Street Name <br /> City, Country <br /> Phone: 123-456-7890 <br /> Email: example@example.com</p>
        </div>
      </div>
      <div className={"footerBottom"}>
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
