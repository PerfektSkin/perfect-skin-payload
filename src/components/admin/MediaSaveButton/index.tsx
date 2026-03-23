'use client'

import React, { useRef } from 'react'
import {
  useForm,
  useFormModified,
  useFormProcessing,
  useDocumentInfo,
  useEditDepth,
  useOperation,
  useTranslation,
} from '@payloadcms/ui'
import { useHotkey } from '@payloadcms/ui'

import './index.scss'

export function MediaSaveButton({ label: labelProp }: { label?: string }) {
  const { uploadStatus } = useDocumentInfo()
  const { t } = useTranslation()
  const { submit } = useForm()
  const modified = useFormModified()
  const processing = useFormProcessing()
  const ref = useRef<HTMLButtonElement>(null)
  const editDepth = useEditDepth()
  const operation = useOperation()

  const isUploading = uploadStatus === 'uploading'
  const isBusy = isUploading || processing
  const disabled = (operation === 'update' && !modified) || isBusy

  const label = labelProp || t('general:save')

  useHotkey(
    {
      cmdCtrlKey: true,
      editDepth,
      keyCodes: ['s'],
    },
    (e) => {
      if (disabled) return
      e.preventDefault()
      e.stopPropagation()
      ref.current?.click()
    },
  )

  const handleSubmit = () => {
    if (isBusy) return
    void submit()
  }

  const displayLabel = isUploading ? 'Uploading...' : processing ? 'Saving...' : label

  return (
    <div className="media-save-button">
      <button
        ref={ref}
        className={`media-save-button__btn${isBusy ? ' media-save-button__btn--busy' : ''}`}
        disabled={disabled}
        id="action-save"
        onClick={handleSubmit}
        type="button"
      >
        {isBusy && (
          <span className="media-save-button__spinner" aria-hidden="true" />
        )}
        <span className={isBusy ? 'media-save-button__label--busy' : ''}>
          {displayLabel}
        </span>
      </button>
    </div>
  )
}
