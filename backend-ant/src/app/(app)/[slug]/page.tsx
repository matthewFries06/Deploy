import type { Metadata } from 'next'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { homeStaticData } from '@/endpoints/seed/home-static'
import React from 'react'

import type { Page } from '@/payload-types'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params }: Args) {
  const { slug = 'home' } = await params

  // 1. Zabezpieczenie przed zapytaniami o pliki statyczne (.ico, .png, .svg itp.)
  if (slug.includes('.')) {
    return notFound()
  }

  let page = await queryPageBySlug({ slug })

  // Dane statyczne gdy baza jest jeszcze nowa/pusta
  if (!page && slug === 'home') {
    try {
      page = homeStaticData() as Page
    } catch {
      page = null
    }
  }

  if (!page) {
    return notFound()
  }

  const { hero, layout } = page

  return (
    <article className="pt-16 pb-24">
      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} />
    </article>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug = 'home' } = await params

  if (slug.includes('.')) {
    return {}
  }

  try {
    const page = await queryPageBySlug({ slug })
    return generateMeta({ doc: page })
  } catch (error) {
    console.error('Błąd podczas generowania metadanych:', error)
    return {}
  }
}

const queryPageBySlug = async ({ slug }: { slug: string }) => {
  try {
    const { isEnabled: draft } = await draftMode()
    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
      collection: 'pages',
      draft,
      limit: 1,
      overrideAccess: draft,
      pagination: false,
      where: {
        and: [
          {
            slug: {
              equals: slug,
            },
          },
          ...(draft ? [] : [{ _status: { equals: 'published' } }]),
        ],
      },
    })

    return result.docs?.[0] || null
  } catch (error) {
    // Przechwytujemy błędy braku tabeli/bazy, zapobiegając crashowi Reacta #441
    console.error(`Nie udało się pobrać strony dla slug "${slug}":`, error)
    return null
  }
}
