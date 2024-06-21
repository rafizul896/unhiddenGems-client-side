import PropTypes from 'prop-types'

const Pagination = ({ currentPage, handlePaginationButton, pages, setItemsPerPage, itemsPerPage, count }) => {
    return (
        <div className='flex justify-center mt-12'>
            <div></div>
            <button onClick={() => handlePaginationButton(currentPage - 1)}
                disabled={currentPage === 1}
                className='px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-[#0d2d5e]  hover:text-white'>
                <div className='flex items-center -mx-1'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='w-6 h-6 mx-1 rtl:-scale-x-100'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M7 16l-4-4m0 0l4-4m-4 4h18'
                        />
                    </svg>

                    <span className='mx-1'>previous</span>
                </div>
            </button>

            {pages?.map(btnNum => (
                <button
                    onClick={() => handlePaginationButton(btnNum)}
                    key={btnNum}
                    className={`${currentPage === btnNum ? 'bg-[#2557a7] text-white' : ''} hidden px-4 py-2 mx-1 transition-colors duration-300 transform  rounded-md sm:inline hover:bg-[#0d2d5e]  hover:text-white`}
                >
                    {btnNum}
                </button>
            ))}
            <select onChange={(e) => setItemsPerPage(e.target.value)} className="border border-[#0d2d5e] rounded-md" value={itemsPerPage}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="30">30</option>
            </select>
            <button
                onClick={() => handlePaginationButton(currentPage + 1)}
                disabled={currentPage === Math.ceil(count / itemsPerPage)}
                className='px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-[#0d2d5e] disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500'>
                <div className='flex items-center -mx-1'>
                    <span className='mx-1'>Next</span>

                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='w-6 h-6 mx-1 rtl:-scale-x-100'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M17 8l4 4m0 0l-4 4m4-4H3'
                        />
                    </svg>
                </div>
            </button>
        </div>
    );
};

Pagination.propTypes = {
    handlePaginationButton: PropTypes.func,
    currentPage: PropTypes.number,
    pages: PropTypes.array,
    setItemsPerPage: PropTypes.func,
    itemsPerPage: PropTypes.number,
}

export default Pagination;