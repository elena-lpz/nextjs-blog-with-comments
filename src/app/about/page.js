import aboutsection from "@/../public/titles/aboutsection.svg";
import vivianmaier from "@/../public/photography/vivianmaier.webp";
import vector from "@/../public/misc/vector.png";

import Image from "next/image";

export const metadata = {
  title: "About - The female gaze",
  description: "A blog about female photographers.",
};

export default function AboutPage() {
  return (
    <section className="my-4 mx-4 md:mx-15 md:my-6">
      <div className="flex flex-col-reverse lg:flex-row justify-between items-center pb-15">
        <div className="flex flex-col w-[100%] lg:w-[40%]">
          <Image
            src={aboutsection}
            alt="about section title"
            className="pt-3 pb-5 md:pb-15"
          />
          <p className="text-md md:text-xl lg:text-2xl font-light pt-6">
            The Female Gaze was born from a simple yet urgent desire: to give
            visibility to women photographers and to celebrate the stories they
            tell. Too often, women&apos;s voices have been overlooked or pushed
            to the margins of the photographic world. This project aims to
            change that. Here, we spotlight the work of women across the globe,
            from seasoned professionals to passionate newcomers, honoring the
            diverse ways they capture moments, shape narratives, and redefine
            what it means to see. The Female Gaze is more than a blog; it&apos;s
            a space for connection, reflection, and empowerment, reminding us
            that every lens has its story, and every story deserves to be seen.
          </p>
        </div>
        <div>
          <Image
            src={vivianmaier}
            alt="Vivian Maier photographing herself and a child"
            width={560}
            height={373}
            placeholder="blur"
          />
          <p className="text-neutral-400 text-xs text-right w-[100%] md:text-sm pt-1 md:pt-2">
            © Vivian Maier
          </p>
        </div>
      </div>
      <Image
        src={vector}
        alt="vector image"
        width={380}
        height={75}
        className="flex -ms-15"
      />
    </section>
  );
}
