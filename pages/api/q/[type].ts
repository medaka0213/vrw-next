// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getMissions, getMeetup, getEvents, fetGetItems } from '@/lib/client'


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any[]>
) {
  let { type, ...params } = req.query

  switch (type) {
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
      if (typeof type !== 'string') {
        // クエリがない場合
        res.status(400)
        return
      }
      fetGetItems({ type, params }).then((data) => {
        res.status(200).json(data)
      })
  }
}
