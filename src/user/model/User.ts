import {CreateUserProfileData} from './ProfileInputData'

interface User extends CreateUserProfileData {
    userId: string
}

export { User as default }
