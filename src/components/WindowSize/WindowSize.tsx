import { useEffect, useState } from "react"
import styles from './WindowSize.module.css'

const WindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className={styles.wrapper}>
      <h1>Window Sizes:</h1>
      <p>Window width: {windowSize['width']}</p>
      <p>Window height: {windowSize['height']}</p>
    </div>
  )
}

export default WindowSize