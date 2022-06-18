import Image from "next/image";

function Rolam() {
  return (
    <section className="relatice max-w-5xl mx-auto my-20 p-8">
      <article className="flex flex-col-reverse md:flex-row justify-center gap-12 mb-28">
        <p className="max-w-lg mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
          esse deleniti aperiam magni cum distinctio. Eos quas exercitationem
          voluptate, id molestias quos, totam impedit expedita porro, aperiam
          fugit ullam numquam cumque nesciunt. Reiciendis eos nisi hic debitis,
          excepturi ipsam in voluptates ipsum repellendus itaque? Accusamus
          suscipit repellat a pariatur numquam, consequatur reprehenderit magnam
          consectetur, assumenda ea nostrum blanditiis ab laboriosam nobis
          doloremque similique minus earum quo esse non velit? Itaque tempore
          ipsum, laboriosam beatae quidem aut at delectus similique fugiat,
          reiciendis temporibus. Voluptatem illum id magni eius dolores soluta
          optio? Placeat repudiandae voluptates a in maxime repellendus officiis
          commodi numquam.
        </p>
        <div className="relative overflow-hidden">
          <img
            src="/images/about-blog.jpg"
            layout="fill"
            objectfit="cover"
            className="w-80 rounded-md shadow-md mx-auto"
          />
        </div>
      </article>
      <article className="flex flex-col md:flex-row justify-center gap-12 mb-28">
        <div className="relative overflow-hidden">
          <img
            src="/images/about-me.jpg"
            layout="fill"
            objectfit="cover"
            className="w-80 rounded-md shadow-md mx-auto"
          />
        </div>
        <p className="max-w-lg mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
          esse deleniti aperiam magni cum distinctio. Eos quas exercitationem
          voluptate, id molestias quos, totam impedit expedita porro, aperiam
          fugit ullam numquam cumque nesciunt. Reiciendis eos nisi hic debitis,
          excepturi ipsam in voluptates ipsum repellendus itaque? Accusamus
          suscipit repellat a pariatur numquam, consequatur reprehenderit magnam
          consectetur, assumenda ea nostrum blanditiis ab laboriosam nobis
          doloremque similique minus earum quo esse non velit? Itaque tempore
          ipsum, laboriosam beatae quidem aut at delectus similique fugiat,
          reiciendis temporibus. Voluptatem illum id magni eius dolores soluta
          optio? Placeat repudiandae voluptates a in maxime repellendus officiis
          commodi numquam.
        </p>
      </article>
    </section>
  );
}

export default Rolam;
