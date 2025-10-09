import { Icon } from "@/components";
import { FEATURES_LIST } from "../constants";
import { icons } from "lucide-react";

function Features() {
  return (
    <section className="section-container" id="features">
      <div className="space-y-10">
        <div className="text-center space-y-3">
          <h3 className="section-title">Features</h3>
          <p className="section-text">Everything you need for a modern chat experience</p>
        </div>

        <div className="flex justify-center flex-wrap gap-4">
          {FEATURES_LIST.map((feature, idx) => (
            <div key={idx} className="container-card space-y-2 p-4 max-w-xs">
              <div className="bg-primary/20 p-2.5 rounded-lg inline-block">
                <Icon className="text-primary size-7" name={feature.icon as keyof typeof icons} />
              </div>
              <h3 className="header-text text-xl">{feature.title}</h3>
              <p className="text-color-light">{feature.message}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
