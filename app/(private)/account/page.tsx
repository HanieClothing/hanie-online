'use client'

import { useEffect, useState } from 'react'
import {
  CreditCardIcon,
  TruckIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'
import { cn } from '@/utils/cn'
import useSupabase from '@/hooks/supabase'
import { Profile } from '@/types/profile'
import ProfileTab from './components/tab-profile'
import ShippingInformationTab from './components/tab-shipping-information'
import PaymentMethodsTab from './components/tab-payment-methods'
import { useRouter } from 'next/navigation'

const AccountPage = () => {
  const router = useRouter()
  const client = useSupabase()
  const [tabs, setTabs] = useState([
    { name: 'Profile', icon: UserCircleIcon, current: true },
    { name: 'Shipping Information', icon: TruckIcon, current: false },
    { name: 'Payment Methods', icon: CreditCardIcon, current: false },
  ])
  const currentTab = tabs.find(tab => tab.current)?.name
  const navigateTab = (tabName: string) => {
    setTabs((prev) => prev.map(item => ({ ...item, current: item.name === tabName })))
  }

  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    const fetchActiveUser = async () => {
      const { data: { user }, error } = await client.auth.getUser()

      if (error || !user) {
        router.push('/sign-in')
        return
      }

      const { data: profile } = await client.from('profiles').select('*').eq('id', user.id).single().throwOnError()

      if (profile) {
        setProfile({
          id: user.id,
          first_name: profile.first_name ?? '',
          last_name: profile.last_name ?? '',
          username: profile.username ?? '',
          email: user?.email ?? '',
          is_email_verified: user.user_metadata.email_verified,
          phone: user?.phone ?? '',
          avatar_url: profile.avatar_url ?? '',
          created_at: user.created_at,
          updated_at: user.updated_at ?? ''
        })
      }
    }

    fetchActiveUser()
  }, [])

  return (
    <div className="mx-auto max-w-7xl lg:px-8">
      <div className='px-4 py-6 sm:px-6 lg:px-0'>
        <h1 className='text-2xl font-semibold'>Account</h1>
      </div>

      <div className='lg:flex lg:gap-x-16'>
        <aside className="flex overflow-x-auto border-b border-gray-900/5 pb-4 lg:block lg:w-64 lg:flex-none lg:border-0 lg:pb-48">
          <nav className="flex-none px-4 sm:px-6 lg:px-0">
            <ul role="list" className="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col">
              {tabs.map((tab) => (
                <li key={tab.name}>
                  <button
                    onClick={() => navigateTab(tab.name)}
                    className={cn(
                      tab.current
                        ? 'bg-gray-100 text-black font-semibold'
                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800',
                      'group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm/6 w-full',
                    )}
                  >
                    <tab.icon
                      aria-hidden="true"
                      className={cn(
                        tab.current ? 'text-black' : 'text-gray-500 group-hover:text-gray-800',
                        'size-6 shrink-0',
                      )}
                    />
                    {tab.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {profile && currentTab && (
          <main className="px-4 pb-6 sm:px-6 lg:flex-auto lg:px-0 lg:pb-48">
            {currentTab === 'Profile' && (
              <ProfileTab profile={profile} />
            )}
            {currentTab === 'Shipping Information' && (
              <ShippingInformationTab />
            )}
            {currentTab === 'Payment Methods' && (
              <PaymentMethodsTab />
            )}
          </main>
        )}
      </div>
    </div>
  )
}

export default AccountPage
