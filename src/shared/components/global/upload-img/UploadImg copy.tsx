import React, { ChangeEvent, FC, useState } from 'react'
import styles from './InputUpload.module.scss'
import { IInputUpload } from '@interface/shared/components/global/input-upload/InputUpload'
import { useTheme } from '@context/theme/ThemeState'
import showToast from '../toast/Toast'

export interface IFileResult {
  name: string;
  size: number;
  data: string
}

const DefaultLabelIcon = ({ color }: {color: string}) => {
  return (
    <svg
      style={{ width: 20, marginLeft: 16, color: `${color}` }}
      aria-hidden='true'
      focusable='false'
      data-prefix='fas'
      data-icon='upload'
      className='svg-inline--fa fa-upload fa-w-16'
      role='img'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 512 512'
    >
      <path
        fill={'currentColor'}
        d='M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z'
      />
    </svg>
  )
}

const InputUpload: FC<IInputUpload> = (props: IInputUpload) => {
  const { theme } = useTheme()
  const initialState = {
    name: '',
    size: 0
  }

  const [uploadStorage, setUploadStorage] = useState(initialState)

  const setData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = e.target.files ? e.target.files[0] : null
    if (data) { setUploadStorage({ name: data?.name, size: data.size }) }
  }

  const clearfunction = () => {
    setUploadStorage(initialState)
  }

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>, onChange: (...event: any[]) => void) => {
    if (props.read && event.target.files) {
      readFileBlob(event.target.files[0], props.image ?? false)
        .then((result) => onChange(result))
        .catch((err) => {
          showToast('error', `file read error ${err}`)
          onChange('')
        })
    } else {
      onChange(event.target.files)
    }
  }

  const readFileBlob = (blob: File, image: boolean): Promise<IFileResult> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      image ? fileReader.readAsDataURL(blob) : fileReader.readAsText(blob)
      fileReader.onload = () => {
        const fileResult: IFileResult = {
          name: blob.name,
          size: blob.size,
          data: fileReader.result as string
        }

        resolve(fileResult as IFileResult)
      }
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }

  return (
    <div className={styles.inputUpload_container} style={{
      background: `${props.disabled
        ? theme.inputsStyles.disabledColor
        : theme.buttonPrimary?.background}`,
      ...props.style
    }}>
      <label className={styles.input_container} style={{
        color: `${theme.inputsStyles.textColorSecondary}`,
        cursor: `${props.disabled
          ? 'default'
          : 'pointer'}`
      }}>

        <input
          id={props.id}
          type='file'
          accept={props.accept}
          hidden
          disabled={props.disabled}
          value={props.value}
          onChange={(e) => {
            setData(e)
            onChangeHandler(e, props.onChange)
          }}
        />
        <div className={styles.content_inputfile}>
          <p>{props.labelText ? props.labelText : 'Select file'}</p>
          {
            props.labelChildren &&
            props.icon
              ? props.icon
              : <DefaultLabelIcon color={theme.buttonPrimary?.textColor ?? '#fff'}/>
          }
        </div>
      </label>
      <div className={styles.input_result}>
        { uploadStorage.name &&
        <>
          <p style={{ color: `${theme.inputsStyles.textColorSecondary}`, maxWidth: props.maxWidthName }}>{uploadStorage.name}</p>
          <Button
            variant='button_icon'
            onClick={clearfunction}
            iconName='FaTimes'
          />
        </>
        }
      </div>
    </div>
  )
}

export default InputUpload
