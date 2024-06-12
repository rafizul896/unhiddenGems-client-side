import { FaUserCog } from 'react-icons/fa'
import MenuItem from './MenuItem'
import { MdOutlinePostAdd } from 'react-icons/md'

const AdminMenu = () => {
    return (
        <>
            <MenuItem icon={MdOutlinePostAdd} label='Add Package' address='add-package' />
            <MenuItem icon={FaUserCog} label='Manage Users' address='manage-users' />
        </>
    )
}

export default AdminMenu