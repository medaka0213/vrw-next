import {
  ParseItem,
  Launch, Event, Rocket, Slide, Meetup, Countdown, Image
} from "@medaka0213/react-vrw"

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

  title() {
    let res = this.item.get_jp_value("name")
    if (this.item instanceof Launch) {
      res = `${this.item.get_jp_value("rocket")} | ${res}`
    }
    return res
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
  slide?: Slide,
}

export class MeetupDetail implements MeetupDetailIF {
  item: Meetup
  mission?: Launch | Event
  poster?: Image[]
  slide?: Slide

  constructor({
    item, mission, poster, slide
  }: MeetupDetailIF) {
    this.item = new Meetup(item)
    this.mission = mission ? ParseItem(mission) : undefined
    this.poster = (poster || []).map((m) => new Image(m))
    this.slide = slide ? new Slide(slide) : undefined
  }

  poster_jp() {
    let poster_jp = this.poster?.length
      ? this?.poster.filter((img: any) => img.name.endsWith("JP"))
      : null;
    return poster_jp?.length ? poster_jp[0].src() : "";
  }

  title() {
    return `${this.item.type.toUpperCase()} : ${this.item.get_jp_value("title")}`
  }

  thumbnail({ includePoster = true, defaultThumbnail = DEFAULT_THUMBNAIL }: {
    includePoster?: boolean,
    defaultThumbnail?: string
  } = {}): string {
    let res: string = this.item.thumbnail() || this.mission?.thumbnail() || defaultThumbnail
    if (includePoster) {
      res = this.poster_jp() || res
    }
    return res === NSF_LOGO ? defaultThumbnail : res
  }
}
