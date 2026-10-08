import EventCard from "./EventCard";

// Editorial asymmetric grid: sizes/offsets rotate through the list.
export default function EventGrid({ events }) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-6">
      {events.map((event, i) => {
        if (events.length === 2) {
          return (
            <div key={event.slug} className="md:col-span-3">
              <EventCard event={event} />
            </div>
          );
        }
        const layout = i % 5;
        let cls = "md:col-span-2";
        let offset = "";
        if (layout === 0) cls = "md:col-span-3";
        if (layout === 1) { cls = "md:col-span-3"; offset = "md:mt-16"; }
        if (layout === 2) { cls = "md:col-span-2"; }
        if (layout === 3) { cls = "md:col-span-2"; offset = "md:mt-10"; }
        if (layout === 4) { cls = "md:col-span-2"; offset = "md:-mt-8"; }
        return (
          <div key={event.slug} className={`${cls} ${offset}`}>
            <EventCard event={event} />
          </div>
        );
      })}
    </div>
  );
}
