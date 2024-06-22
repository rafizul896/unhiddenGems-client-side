import { useState } from 'react';
import Select from 'react-select';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import Pagination from '../../../components/Pagination/Pagination';

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('');
    // pagination
    const [count, setCount] = useState('')
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    // handle pagination button
    const handlePaginationButton = (value) => {
        setCurrentPage(value)
    }

    // count total
    useQuery({
        queryKey: ['total-users', search, filter],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users-total?search=${search}&filter=${filter}`);
            return setCount(parseInt(data.count));
        }
    })

    const pages = [...Array(Math.ceil(count / itemsPerPage)).keys()].map(e => e + 1)

    // 
    const { data: users, refetch } = useQuery({
        queryKey: ['allusers', search, filter, itemsPerPage, currentPage],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users?page=${currentPage}&size=${itemsPerPage}&search=${search}&filter=${filter}`);
            return data;
        }
    })

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleFilterChange = (selectedOption) => {
        setFilter(selectedOption.value);
    };

    const handleRoleChange = async (id, newRole) => {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const { data } = await axiosSecure.patch(`/users/${id}`, { role: newRole });
                    if (data.modifiedCount > 0) {
                        Swal.fire({
                            title: "Success!",
                            icon: "success"
                        });
                    }
                    refetch()
                } catch (error) {
                    console.error('Error updating user role:', error);
                }
            }
        })
    };

    const roleOptions = [
        { value: '', label: 'All Roles' },
        { value: 'Tourist', label: 'User/Tourist' },
        { value: 'Admin', label: 'Admin' },
        { value: 'Tour Guide', label: 'Tour Guide' }
    ];

    return (
        <div className="">
            <h2 className="text-2xl font-bold mb-4 text-center">Manage Users</h2>
            <div className="flex mb-4">
                <input
                    type="text"
                    value={search}
                    onChange={handleSearchChange}
                    placeholder="Search by Name/Email"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                />
                <Select
                    options={roleOptions}
                    onChange={handleFilterChange}
                    className="w-full"
                />
            </div>
            <div className='overflow-x-auto'>
                <table className="min-w-full bg-white mb-4 overflow-hidden">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Name</th>
                            <th className="py-2 px-4 border-b">Email</th>
                            <th className="py-2 px-4 border-b">Role</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map(user => (
                            <tr key={user._id}>
                                <td className="py-2 px-4 border-b">{user.name}</td>
                                <td className="py-2 px-4 border-b">{user.email}</td>
                                <td className="py-2 px-4 border-b">{user.role}</td>
                                <td className="py-2 px-4 border-b">
                                    <button
                                        onClick={() => handleRoleChange(user._id, 'Admin')}
                                        className={`bg-blue-500 text-white px-4 py-2 rounded mr-2 cursor-pointer ${user.role == 'Admin' && 'cursor-not-allowed'}`}
                                        disabled={user.role === 'Admin'}
                                    >
                                        Make Admin
                                    </button>
                                    <button
                                        onClick={() => handleRoleChange(user._id, 'Tour Guide')}
                                        className={`bg-green-500 text-white px-4 py-2 rounded cursor-pointer ${user.role == 'Tour Guide' && 'cursor-not-allowed'}`}
                                        disabled={user.role == 'Tour Guide'}
                                    >
                                        Make Tour Guide
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination count={count} handlePaginationButton={handlePaginationButton} currentPage={currentPage} setItemsPerPage={setItemsPerPage} itemsPerPage={itemsPerPage} pages={pages} />
        </div>
    );
};

export default ManageUsers;
