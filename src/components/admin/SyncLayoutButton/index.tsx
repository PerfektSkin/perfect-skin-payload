'use client'

import React, { useState } from 'react'
import { toast, useDocumentInfo } from '@payloadcms/ui'

export function SyncLayoutButton() {
  const { id } = useDocumentInfo() as { id?: string | number }
  const [syncing, setSyncing] = useState(false)

  const onSync = async () => {
    if (!id || syncing) return

    setSyncing(true)
    try {
      const res = await fetch(`/api/pages/${id}/sync-layouts`, {
        method: 'POST',
      })

      if (!res.ok) throw new Error('Sync failed')
      toast.success('Layout synced from RO to RU/EN.')
    } catch {
      toast.error('Could not sync layout. Please try again.')
    } finally {
      setSyncing(false)
    }
  }

  return (
    <div style={{ marginBottom: 12 }}>
      <button
        type="button"
        onClick={onSync}
        disabled={!id || syncing}
        style={{
          height: 36,
          padding: '0 14px',
          borderRadius: 4,
          border: '1px solid var(--theme-elevation-400)',
          background: 'var(--theme-elevation-0)',
          cursor: syncing ? 'wait' : 'pointer',
          opacity: !id || syncing ? 0.6 : 1,
          fontWeight: 600,
        }}
      >
        {syncing ? 'Syncing...' : 'Sync Layout'}
      </button>
    </div>
  )
}
