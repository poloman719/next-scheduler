import style from '@/styles/Logo.module.css'

const Logo = () => {
  return <div className={style.logo}>
    <div className={style.boxes}>
      <div className={style.a}></div>
      <div className={style.b}></div>
      <div className={style.c}></div>
    </div>
    <h1>SCHEDULER</h1>
  </div>
}

export default Logo;