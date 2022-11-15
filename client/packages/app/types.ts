export interface Profile {
  profile_id: number
  name: string
  verified: boolean
  img_url: string
  cover_url: string
  minting_enabled: boolean
  bio: string
  website_url: string
  username: string
  default_list_id: number
  default_created_sort_id: number
  default_owned_sort_id: number
  notifications_last_opened: Date
  has_onboarded: boolean
  has_verified_phone_number: boolean
}

type FollowType = {
  profile_id: number
}

export type UserType = {
  data: {
    follows: FollowType[]
    profile: Profile
    likes_nft: number[]
    likes_comment: number[]
    comments: number[]
    blocked_profile_ids: number[]
  }
}

export type AuthenticationStatus =
  | 'IDLE'
  | 'REFRESHING'
  | 'AUTHENTICATING'
  | 'AUTHENTICATED'
  | 'UNAUTHENTICATED'

export type MyInfo = {
  data: {
    follows: Array<{ profile_id: number }>
    profile: Profile & {
      has_spotify_token: boolean
      spotify_artist_id: null | number
    }
    likes_nft: number[]
    likes_comment: any[]
    comments: number[]
    blocked_profile_ids: number[]
    notifications_last_opened: string | null
  }
}
