import Link from "next/link"

export default function UserProfilePage({ }) {
  return (
    <div>
      <Link prefetch={false} href={'/[username]?username=nina'}>
      Nina&apos;s Profile
      </Link>
    </div>
  )
}