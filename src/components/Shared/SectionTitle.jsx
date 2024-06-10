import PropTypes from 'prop-types'; // ES6

const SectionTitle = ({ heading, subHeading }) => {
    return (
        <div className="flex flex-col justify-center items-center py-5 space-y-2">
            <p className="text-[#D99904] md:text-xl">{subHeading}</p>
            <h2 className="text-2xl md:text-4xl font-medium  ">{heading}</h2>
        </div>
    );
};

SectionTitle.propTypes = {
    heading: PropTypes.string,
    subHeading: PropTypes.string
}

export default SectionTitle;