import Image from "next/image";

const InfinityFeature = () => {
  return (
    <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
      {/* Left Column: Infinity Logo */}
      <div className="flex justify-center">
        <Image
          src="/images/infinity.png" // Make sure this path is correct
          alt="Infinity Event Logo"
          width={250}
          height={250}
          className="h-auto w-48 md:w-64"
        />
      </div>
      {/* Right Column: Infinity Description */}
      <div className="flex flex-col items-start gap-4">
        <h2 className="text-balance text-left text-3xl font-extrabold tracking-tight">
          Our Flagship Event: Infinity
        </h2>
        <p className="text-left text-muted-foreground">
          Every year, Infinity brings together the brightest minds, the most
          innovative thinkers, and the most passionate creators for a
          one-of-a-kind gathering. It’s a celebration of limitless potential and
          a testament to what happens when curiosity meets ingenuity.
        </p>
        <p className="text-left text-muted-foreground">
          So mark your calendars and join us as we embark on an unforgettable
          journey at Infinity. Together, let’s celebrate the power of
          creativity, the joy of discovery, and the endless possibilities that
          lie ahead. Infinity awaits – are you ready to explore?
        </p>
      </div>
    </div>
  );
};

export default InfinityFeature;
