import { useMemo } from 'react'
import { useStorage } from '@context/global-state/GlobalState'
import { ISpinnerModel } from '@interface/core/model/spinner/Spinner'

const useSpinnerModel = (): ISpinnerModel => {
  const { storage, updateStorage } = useStorage<boolean>('spinner', false)

  const setSpinner = (value: boolean) => {
    updateStorage(value)
  }

  const spinnerStorage = useMemo<boolean>(() => storage, [storage])

  return {
    spinnerStorage,
    setSpinner
  }
}

export default useSpinnerModel
