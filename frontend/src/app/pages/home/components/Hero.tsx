import { Button } from "@/components";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="section-container pt-28">
      <div className="text-center space-y-3 lg:space-y-6">
        <h1 className="header-text text-4xl lg:text-7xl max-w-xl lg:max-w-4xl mx-auto">
          Dialoga: Your Simple & Elegant Chat Experience
        </h1>
        <p className="text-color-light dark:text-zinc-300! text-lg lg:text-xl max-w-lg mx-auto">
          A practice project showcasing modern UI design and chat functionality
        </p>

        <div className="space-x-3.5">
          <Link to={"/chat"}>
            <Button variant="primary">Get Started</Button>
          </Link>
          <Link to={"https://github.com/sam4web/project-dialoga"}>
            <Button variant="outline">View on Github</Button>
          </Link>
        </div>

        <div className="flex-center pt-3">
          <img
            className="container-card p-0 object-cover aspect-auto"
            src="https://id-preview--cc04c88d-33ab-4d81-a280-af8578486d4e.lovable.app/assets/hero-chat-interface-CXppf2ZD.jpg"
            alt=""
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
