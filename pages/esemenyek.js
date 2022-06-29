/* eslint-disable comma-dangle */
/* eslint-disable function-paren-newline */
/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */
import Image from 'next/image';
import { getEvents } from '../services';

export default function Events({ events }) {
  const formatDate = (date) => {
    const yearMonthDay = date.split('T')[0];
    const hoursMinutes = date.split('T')[1].split('+')[0].slice(0, 5);

    const formattedDate = `${yearMonthDay} ${hoursMinutes}`;
    return formattedDate;
  };

  return (
    <section className="container mx-auto px-6 md:px-10 mb-20 mt-12">
      <div className="events-container container bg-white shadow-lg rounded-lg p-4 lg:p-8 pb-12 mb-8">
        <h1 className="border-b-4 border-yellow-500 text-2xl mb-12 pb-1 font-semibold">
          Közelgő események
        </h1>
        {events.map((event, index) => (
          <article
            key={index}
            className="relative mb-8 flex flex-col md:flex-row gap-8 border-b-4 border-yellow-500 pb-4"
          >
            <div className="relative w-full h-56 md:w-36 md:h-36">
              <Image
                src={
                  event.node.image?.documentInStages[0]?.url ??
                  '/images/something.jpg'
                }
                alt={
                  event.node.image?.documentInStages[0]?.fileName ??
                  `Mami varródoboza eseményéhez kapcsolódó kép(${event.node.name}) `
                }
                layout="fill"
                className="rounded-md"
                objectFit="cover"
              />
            </div>
            <div className="w-full md:w-10/12">
              <p className="text-xl">{event.node.name}</p>
              <p className="text-sm mb-2 text-gray-700">
                {formatDate(event.node.date)}
              </p>
              <p>{event.node.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

// Fetch data at build time
export async function getStaticProps() {
  const events = await getEvents();
  events.sort(
    (event1, event2) =>
      new Date(event2.node.date).getTime() -
      new Date(event1.node.date).getTime()
  );

  return {
    props: { events },
  };
}
