export interface GameEvent {
  eventID: string;
  name: string;
  eventType: string;
  heading: string;
  link: string;
  image: string;
  start: string;
  end: string;
  status: "live" | "upcoming" | "completed";

}