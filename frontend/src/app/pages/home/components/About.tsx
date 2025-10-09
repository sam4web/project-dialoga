import { TECH_STACK } from "../constants";

function About() {
  return (
    <section className="section-container" id="about">
      <div className="grid sm:grid-cols-2 gap-x-4 gap-y-5">
        <div className="space-y-3">
          <h3 className="section-title">About</h3>
          <p className="text-color-light text-lg max-w-md">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Id in animi accusantium optio, sed ex repellat
            cumque ipsum quos nemo itaque quaerat reprehenderit modi et expedita doloremque. Dolorum, illo veritatis.
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
