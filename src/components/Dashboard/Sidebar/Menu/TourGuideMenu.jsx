import { MdAssignment } from "react-icons/md";
import MenuItem from "./MenuItem";

const TourGuideMenu = () => {
    return (
        <>
            <MenuItem icon={MdAssignment} label='My Assigned Tours' address='add-package' />
        </>
    );
};

export default TourGuideMenu;