import { Button } from "@/components";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="section-container h-[75dvh] flex-center pt-28">
      <div className="text-center space-y-3 lg:space-y-6">
        <h1 className="header-text text-4xl lg:text-7xl max-w-xl lg:max-w-4xl mx-auto">
          Dialoga: Fullstack Real-Time Chat Application
        </h1>
        <p className="text-color-light dark:text-zinc-300! text-lg lg:text-xl max-w-lg mx-auto">
          A practice project built to learn full-stack development, clean architecture, and WebSocket implementation.
        </p>

        <div className="space-x-3.5">
          <Link to={"/chat"}>
            <Button variant="primary">Get Started</Button>
          </Link>
          <Link to={"https://github.com/sam4web/project-dialoga"}>
            <Button variant="outline">View on Github</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
