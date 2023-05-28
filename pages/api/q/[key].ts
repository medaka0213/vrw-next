// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getMissions, getMeetup, getEvents } from '@/lib/client'


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any[]>
) {
  const { key } = req.query

  switch (key) {
    case 'mission':
      getMissions().then((data) => {
        res.status(200).json(data)
      })
      break
    case 'meetup':
      getMeetup().then((data) => {
        res.status(200).json(data)
      })
      break
    case 'events':
      getEvents().then((data) => {
        res.status(200).json(data)
      })
      break
    default:
      res.status(404).json([])
  }
}
