import {
  ParseItem,
  Launch, Event, Rocket, Slide, Meetup, Countdown, Image
} from "react-vrw"

const DEFAULT_THUMBNAIL = "https://img.virtualrocketwatching.net/image/image_3636fb8c-5931-4993-82c9-1745ce031d0e.jpeg"
const NSF_LOGO = "https://storage.googleapis.com/nextspaceflight/media/rockets/default.jpg"

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

  thumbnail() {
    const res = this.item?.thumbnail() || this.rocket?.thumbnail() || DEFAULT_THUMBNAIL
    return res === NSF_LOGO ? DEFAULT_THUMBNAIL : res
  }
}


interface MeetupDetailIF {
  item: Meetup,
  mission?: Launch | Event
  poster?: Image[]
}

export class MeetupDetail implements MeetupDetailIF {
  item: Meetup
  mission?: Launch | Event
  poster?: Image[]

  constructor({
    item, mission, poster
  }: MeetupDetailIF) {
    this.item = new Meetup(item)
    this.mission = mission ? ParseItem(mission) : undefined
    this.poster = (poster || []).map((m) => new Image(m))
  }

  poster_jp() {
    let poster_jp = this.poster?.length
      ? this?.poster.filter((img: any) => img.name.endsWith("JP"))
      : null;
    return poster_jp?.length ? poster_jp[0].src() : null;
  }

  thumbnail() {
    const res = this.poster_jp() || this.item.thumbnail() || this.mission?.thumbnail() || DEFAULT_THUMBNAIL
    return res === NSF_LOGO ? DEFAULT_THUMBNAIL : res
  }
}
