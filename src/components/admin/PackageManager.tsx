'use client';

import React, { useState } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

interface Package {
  _id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  isPopular: boolean;
}

interface PackageManagerProps {
  packages: Package[];
  onUpdate: (packageId: string, packageData: any) => void;
  onCreate: (packageData: any) => void;
  onRefresh: () => void;
}

const PackageManager: React.FC<PackageManagerProps> = ({ packages, onUpdate, onCreate, onRefresh }) => {
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newPackage, setNewPackage] = useState<Omit<Package, '_id'>>({
    name: '',
    description: '',
    price: 0,
    features: [''],
    isPopular: false,
  });

  const handleEditClick = (pkg: Package) => {
    setEditingPackage({ ...pkg });
    setIsCreating(false);
  };

  const handleCreateClick = () => {
    setIsCreating(true);
    setEditingPackage(null);
    setNewPackage({
      name: '',
      description: '',
      price: 0,
      features: [''],
      isPopular: false,
    });
  };

  const handleCancelEdit = () => {
    setEditingPackage(null);
    setIsCreating(false);
  };

  const handleSaveEdit = () => {
    if (editingPackage) {
      onUpdate(editingPackage._id, editingPackage);
      setEditingPackage(null);
    }
  };

  const handleCreatePackage = () => {
    onCreate(newPackage);
    setIsCreating(false);
  };

  const handleFeatureChange = (index: number, value: string, isEditing: boolean) => {
    if (isEditing && editingPackage) {
      const updatedFeatures = [...editingPackage.features];
      updatedFeatures[index] = value;
      setEditingPackage({ ...editingPackage, features: updatedFeatures });
    } else if (!isEditing) {
      const updatedFeatures = [...newPackage.features];
      updatedFeatures[index] = value;
      setNewPackage({ ...newPackage, features: updatedFeatures });
    }
  };

  const handleAddFeature = (isEditing: boolean) => {
    if (isEditing && editingPackage) {
      setEditingPackage({
        ...editingPackage,
        features: [...editingPackage.features, ''],
      });
    } else if (!isEditing) {
      setNewPackage({
        ...newPackage,
        features: [...newPackage.features, ''],
      });
    }
  };

  const handleRemoveFeature = (index: number, isEditing: boolean) => {
    if (isEditing && editingPackage) {
      const updatedFeatures = [...editingPackage.features];
      updatedFeatures.splice(index, 1);
      setEditingPackage({ ...editingPackage, features: updatedFeatures });
    } else if (!isEditing) {
      const updatedFeatures = [...newPackage.features];
      updatedFeatures.splice(index, 1);
      setNewPackage({ ...newPackage, features: updatedFeatures });
    }
  };

  return (
    <div className="bg-white shadow sm:rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Service Packages</h3>
        <div className="flex space-x-2">
          <button
            onClick={onRefresh}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Refresh
          </button>
          <button
            onClick={handleCreateClick}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <FaPlus className="mr-2" /> Add Package
          </button>
        </div>
      </div>

      {/* Create Package Form */}
      {isCreating && (
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6 bg-gray-50">
          <h4 className="text-md font-medium text-gray-900 mb-4">Create New Package</h4>
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="new-name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="new-name"
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={newPackage.name}
                  onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="new-price" className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  id="new-price"
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={newPackage.price}
                  onChange={(e) => setNewPackage({ ...newPackage, price: parseFloat(e.target.value) })}
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="new-description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <div className="mt-1">
                <textarea
                  id="new-description"
                  rows={3}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={newPackage.description}
                  onChange={(e) => setNewPackage({ ...newPackage, description: e.target.value })}
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <fieldset>
                <legend className="text-sm font-medium text-gray-700">Features</legend>
                <div className="mt-2 space-y-2">
                  {newPackage.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="text"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value, false)}
                      />
                      {newPackage.features.length > 1 && (
                        <button
                          type="button"
                          className="ml-2 text-red-600 hover:text-red-800"
                          onClick={() => handleRemoveFeature(index, false)}
                        >
                          <FaTrash />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={() => handleAddFeature(false)}
                  >
                    <FaPlus className="mr-1" /> Add Feature
                  </button>
                </div>
              </fieldset>
            </div>

            <div className="sm:col-span-6">
              <div className="flex items-center">
                <input
                  id="new-is-popular"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={newPackage.isPopular}
                  onChange={(e) => setNewPackage({ ...newPackage, isPopular: e.target.checked })}
                />
                <label htmlFor="new-is-popular" className="ml-2 block text-sm text-gray-700">
                  Mark as Popular
                </label>
              </div>
            </div>
          </div>

          <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleCreatePackage}
            >
              Create
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Edit Package Form */}
      {editingPackage && (
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6 bg-gray-50">
          <h4 className="text-md font-medium text-gray-900 mb-4">Edit Package</h4>
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="edit-name"
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={editingPackage.name}
                  onChange={(e) => setEditingPackage({ ...editingPackage, name: e.target.value })}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="edit-price" className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  id="edit-price"
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={editingPackage.price}
                  onChange={(e) => setEditingPackage({ ...editingPackage, price: parseFloat(e.target.value) })}
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <div className="mt-1">
                <textarea
                  id="edit-description"
                  rows={3}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={editingPackage.description}
                  onChange={(e) => setEditingPackage({ ...editingPackage, description: e.target.value })}
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <fieldset>
                <legend className="text-sm font-medium text-gray-700">Features</legend>
                <div className="mt-2 space-y-2">
                  {editingPackage.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="text"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value, true)}
                      />
                      {editingPackage.features.length > 1 && (
                        <button
                          type="button"
                          className="ml-2 text-red-600 hover:text-red-800"
                          onClick={() => handleRemoveFeature(index, true)}
                        >
                          <FaTrash />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={() => handleAddFeature(true)}
                  >
                    <FaPlus className="mr-1" /> Add Feature
                  </button>
                </div>
              </fieldset>
            </div>

            <div className="sm:col-span-6">
              <div className="flex items-center">
                <input
                  id="edit-is-popular"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={editingPackage.isPopular}
                  onChange={(e) => setEditingPackage({ ...editingPackage, isPopular: e.target.checked })}
                />
                <label htmlFor="edit-is-popular" className="ml-2 block text-sm text-gray-700">
                  Mark as Popular
                </label>
              </div>
            </div>
          </div>

          <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleSaveEdit}
            >
              Save
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Packages List */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {packages.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  No packages found
                </td>
              </tr>
            ) : (
              packages.map((pkg) => (
                <tr key={pkg._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{pkg.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${pkg.price.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 truncate max-w-xs">{pkg.description}</div>
                    <div className="mt-1">
                      <ul className="text-xs text-gray-500 list-disc list-inside">
                        {pkg.features.slice(0, 2).map((feature, index) => (
                          <li key={index} className="truncate max-w-xs">{feature}</li>
                        ))}
                        {pkg.features.length > 2 && (
                          <li className="text-gray-400">+{pkg.features.length - 2} more</li>
                        )}
                      </ul>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {pkg.isPopular ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Popular
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                        Standard
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      className="text-blue-600 hover:text-blue-900 mr-4"
                      onClick={() => handleEditClick(pkg)}
                    >
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PackageManager;
