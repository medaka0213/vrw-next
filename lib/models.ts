import {
  ParseItem,
  Launch, Event, Rocket, Slide, Meetup, Countdown, Image
} from "react-vrw"

interface MissionDetailIF {
  item: Launch | Event,
  rocket?: Rocket,
  slide?: Slide,
  meetup?: Meetup[],
  countdown?: Countdown
}

export class MissionDetail implements MissionDetailIF {
  item: Launch | Event
  rocket?: Rocket
  slide?: Slide
  meetup?: Meetup[]
  countdown?: Countdown

  constructor({
    item, rocket, slide, meetup, countdown
  }: MissionDetailIF) {
    this.item = ParseItem(item)
    this.rocket = rocket ? new Rocket(rocket) : undefined
    this.slide = slide ? new Slide(slide) : undefined
    this.meetup = (meetup || []).map((m) => new Meetup(m))
    this.countdown = countdown ? new Countdown(countdown) : undefined
  }
}


export interface MeetupDetail {
  item: Meetup,
  mission?: Launch | Event
  poster?: Image[]
}

