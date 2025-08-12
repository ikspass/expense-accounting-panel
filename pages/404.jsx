import Link from "next/link"

const Error = () => {
  return (
    <div>
      <h1>Ошибочка вышла</h1>
      <Link href='/'>
        <p>Вернуться на главную страницу</p>
      </Link>
    </div>
  )
}

export default Error