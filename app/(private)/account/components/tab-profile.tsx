import useSupabase from "@/hooks/supabase"
import { Profile } from "@/types/profile"
import { useRouter } from "next/navigation"

type Props = {
  profile: Profile
}

const ProfileTab = ({ profile }: Props) => {
  const router = useRouter()
  const client = useSupabase()

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault()

    await client.auth.signOut()
    router.push('/store')
  }

  return (
    <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
      <div>
        <h2 className="text-base/7 font-semibold text-gray-900">Profile</h2>
        <p className="mt-1 text-sm/6 text-gray-500">
          This information will be displayed publicly so be careful what you share.
        </p>

        <dl className="mt-6 divide-y divide-gray-100 border-t border-gray-200 text-sm/6">
          <div className="py-6 sm:flex">
            <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Full name</dt>
            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <div className="text-gray-900">{`${profile.last_name} ${profile.first_name}`}</div>
              <button type="button" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Update
              </button>
            </dd>
          </div>
          <div className="py-6 sm:flex">
            <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Email address</dt>
            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <div className="text-gray-900">{profile.email}</div>
              <button type="button" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Update
              </button>
            </dd>
          </div>
        </dl>

        <div className="flex justify-end mt-8">
          <button
            type="submit"
            onClick={handleClick}
            className="flex w-fit items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-black shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 text-sm"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfileTab
