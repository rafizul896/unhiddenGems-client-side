import PropTypes from 'prop-types'; // ES6

const SectionTitle = ({ heading }) => {
    return (
        <div className="flex flex-col justify-center items-center py-5 space-y-2">
            <h2 className="text-2xl md:text-4xl font-bold text-center ">{heading}</h2>
        </div>
    );
};

SectionTitle.propTypes = {
    heading: PropTypes.string,
    subHeading: PropTypes.string
}

export default SectionTitle;