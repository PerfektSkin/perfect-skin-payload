'use client'
import { useRowLabel } from '@payloadcms/ui'

const SubCategoryRowLabel = () => {
  const { data, rowNumber } = useRowLabel<{
    itemType?: 'link' | 'category'
    categoryLabel?: string
    link?: {
      label?: string
      type?: string
      reference?: {
        value?: {
          title?: string
        } | string
      }
      url?: string
    }
  }>()

  const rowIndex = (rowNumber ?? 0) + 1
  const isCategory =
    data?.itemType === 'category' ||
    (data?.itemType !== 'link' && Boolean(data?.categoryLabel))

  if (isCategory) {
    return <span>{data?.categoryLabel || `Category ${rowIndex}`}</span>
  }

  const label = data?.link?.label
  const linkType = data?.link?.type

  let displayLabel = label || `Link ${rowIndex}`

  if (!label && linkType === 'reference' && data?.link?.reference?.value) {
    const refValue = data.link.reference.value
    if (typeof refValue === 'object' && refValue.title) {
      displayLabel = refValue.title
    }
  }

  if (!label && linkType === 'custom' && data?.link?.url) {
    displayLabel = data.link.url
  }

  return <span>{displayLabel}</span>
}

export default SubCategoryRowLabel
