import { Button } from "@/components";
import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="section-container" id="screenshots">
      <div className="space-y-5 text-center">
        <div className="text-center space-y-3">
          <h3 className="section-title">CTA</h3>
          <p className="section-text">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione optio est quaerat
          </p>
        </div>

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

export default CTA;
