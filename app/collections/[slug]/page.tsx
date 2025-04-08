'use client'

import { useParams } from 'next/navigation';

function Collection() {
  const { slug } = useParams()

  return <div>Collection: {slug}</div>
}

export default Collection
