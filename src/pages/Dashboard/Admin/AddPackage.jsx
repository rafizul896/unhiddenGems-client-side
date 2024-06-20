import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { RiAddLargeFill } from 'react-icons/ri';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const AddPackage = () => {
  const axiosSecure = useAxiosSecure();
  const [formState, setFormState] = useState({
    tourPlan: [
      { day: '', title: '', description: '' }
    ]
  });

  // use queary
  const { mutateAsync } = useMutation({
    mutationFn: async packageData => {
      const { data } = await axiosSecure.post('/packages', packageData)
      return data
    },
    onSuccess: () => {
      Swal.fire({
        title: "Success!",
        text: "Your package has been saved",
        icon: "success",
        timer: 2000
      });
    },
    onError: (e) => {
      toast.error(e?.message)
    }
  })

  const handleTourPlanChange = (index, e) => {
    const { name, value } = e.target;
    const newTourPlan = formState.tourPlan.map((plan, i) => (
      i === index ? { ...plan, [name]: value } : plan
    ));
    setFormState({
      ...formState,
      tourPlan: newTourPlan
    });
  };

  const addTourPlanDay = () => {
    setFormState({
      ...formState,
      tourPlan: [...formState.tourPlan, { day: '', title: '', description: '' }]
    });
  };

  // Handle Submit the Package
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const tourType = form.tourType.value;
    const tripTitle = form.tripTitle.value;
    const aboutTour = form.aboutTour.value;
    const price = form.price.value;
    const images = form.image.value?.split(',').map(url => url.trim());

    const packag = {
      tourType,
      tripTitle,
      aboutTour,
      images,
      price,
      tourPlan: formState.tourPlan
    }
    console.log(packag);
    await mutateAsync(packag);
  };

  return (
    <div className="container mx-auto md:p-4">
      <h2 className="text-2xl font-bold mb-4">Add New Package</h2>
      <form onSubmit={handleSubmit}>
        {/* Tour Type */}
        <div className="mb-4">
          <label className="block text-gray-700 text-lg font-medium mb-2">Tour Type</label>
          <input
            required
            type="text"
            name="tourType"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {/* Trip Title */}
        <div className="mb-4">
          <label className="block text-gray-700 text-lg font-medium mb-2">Trip Title</label>
          <input
            required
            type="text"
            name="tripTitle"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {/* Price */}
        <div className="mb-4">
          <label className="block text-gray-700 text-lg font-medium mb-2">Price</label>
          <input
            required
            type="text"
            name="price"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {/* Images */}
        <div className="mb-4">
          <label className="block text-gray-700 text-lg font-medium mb-2">Images (comma separated URLs)</label>
          <input
            required
            type="text"
            name="image"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {/* About The Tour */}
        <div className="mb-4">
          <label className="block text-gray-700 text-lg font-medium mb-2">About The Tour</label>
          <textarea
            name="aboutTour"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>
        {/* Tour Plan */}
        <div className="mb-4 relative">
          <label className="block text-gray-700 text-lg font-medium mb-2 py-1">Tour Plan</label>
          {formState.tourPlan.map((plan, index) => (
            <div key={index} className="mb-2">
              <input
                required
                type="text"
                name="day"
                value={plan.day}
                placeholder="Day"
                onChange={(e) => handleTourPlanChange(index, e)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
              />
              <input
                required
                type="text"
                name="title"
                value={plan.title}
                placeholder="Title"
                onChange={(e) => handleTourPlanChange(index, e)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
              />
              <textarea
                name="description"
                value={plan.description}
                placeholder="Description"
                onChange={(e) => handleTourPlanChange(index, e)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
              ></textarea>
            </div>
          ))}
          {/* add more tour plan */}
          <button
            type="button"
            onClick={addTourPlanDay}
            className="rounded absolute top-2.5 text-lg left-[80px] tooltip"
            data-tip="Add more"
          >
            <RiAddLargeFill />
          </button>
        </div>
        {/* Submit button */}
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Package
        </button>
      </form>
    </div>
  );
};

export default AddPackage;