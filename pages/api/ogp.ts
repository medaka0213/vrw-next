// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getOgp } from '@/lib/client'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any[]>
) {
  // POSTでbody= {url} がポストされたらOGPを取得する
  if (req.method === 'POST') {
    const { url } = req.body
    if (!url) {
      res.status(400)
      return
    }
    getOgp({ url }).then((data) => {
      res.status(200).json(data)
    })
  } else {
    res.status(400)
  }
}
