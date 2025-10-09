import { TECH_STACK } from "../constants";

function About() {
  return (
    <section className="section-container" id="about">
      <div className="grid  md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-5">
        <div className="space-y-3 lg:col-span-2">
          <h3 className="section-title">About Dialoga</h3>
          <p className="text-color-light text-lg max-w-2xl">
            Dialoga is a practice project built to learn the development of <b>real-time chat applications</b> using the{" "}
            <b>MERN stack</b>. The scope covered the entire application lifecycle: designing the React user interface,
            building the Node/Express backend, and handling data with MongoDB. A key focus was integrating WebSockets
            for smooth, instant communication. This experience provided practical expertise in API development,
            efficient database management, and connecting complex full-stack components.
          </p>
        </div>

        <div className="space-y-2">
          <h4 className="header-text text-xl lg:text-xl">Tech Stack</h4>
          <div className="flex flex-wrap gap-2.5">
            {TECH_STACK.map((item, idx) => (
              <div className="container-card rounded-xl px-3 py-2" key={idx}>
                <p className="text-color-light text-base">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
