import femalegazetext from "@/../public/logos/femalegazetext.svg";
import tonjebboe1 from "@/../public/photography/tonjebboe1.jpg";
import vector from "@/../public/misc/vector.png";
import Image from "next/image";

export default function Main() {
  return (
    <section className=" m-4 md:m-15">
      <Image
        src={vector}
        alt="vector image"
        width={380}
        height={75}
        className="md:-ms-15 md:pb-6"
      />
      <div className=" flex flex-col-reverse md:flex-row items-start justify-between">
        <p className="flex md:w-[30%] text-md md:text-2xl font-light pt-10 md:pt-0">
          Through the Female Gaze, light finds its voice. A quiet revolution
          framed in moments, where women capture the world as only they can see
          it.
        </p>
        <div className="flex flex-col items-end">
          <Image
            src={tonjebboe1}
            alt="A woman looking at deer in the museum of national history"
            width={400}
            height={200}
            className="w-[70%] md:w-[50%] xl:w-[70%] pt-10 md:pt-0"
          />
          <p className="text-neutral-400 text-xs w-[70%] text-right md:w-[100%] md:text-sm pt-1 md:pt-2">
            © Tonje Boe Birkeland, Character #III
          </p>
        </div>
      </div>

      <Image
        src={femalegazetext}
        alt="Logo in red of The Female Gaze"
        width={2400}
        height={400}
        className="absolute bottom-10 pt-10 md:pt-0 w-[90dvw] md:w-[90dvw] "
      />
    </section>
  );
}
