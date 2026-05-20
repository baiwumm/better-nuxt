import type { ConfirmDialogProps } from '@/components/ConfirmDialog/index.vue'
import { ConfirmDialog } from '#components'

export function useConfirmDialog() {
  const overlay = useOverlay()

  return (options: ConfirmDialogProps): Promise<boolean> => {
    const modal = overlay.create(ConfirmDialog, {
      destroyOnClose: true,
      props: options,
    })

    return modal.open()
  }
}
