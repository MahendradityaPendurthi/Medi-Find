import React, { useState } from 'react';
import { Search, Plus, X } from 'lucide-react';
import { useStore } from '../store';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function Home() {
  const { doses, addDose, removeDose, searchPharmacies } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddDose, setShowAddDose] = useState(false);
  const [newDose, setNewDose] = useState({ name: '', time: '', days: [] as string[] });

  const currentDay = DAYS[new Date().getDay() - 1];
  const pharmacies = searchPharmacies(searchQuery);

  const handleAddDose = () => {
    if (newDose.name && newDose.time && newDose.days.length > 0) {
      addDose(newDose);
      setNewDose({ name: '', time: '', days: [] });
      setShowAddDose(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Medicine Finder</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search medicines..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Your Dose</h2>
              <button
                onClick={() => setShowAddDose(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                <Plus size={20} />
                Add Dose
              </button>
            </div>

            {showAddDose && (
              <div className="mb-6 p-4 border border-gray-200 rounded-lg">
                <div className="flex flex-col gap-4">
                  <input
                    type="text"
                    placeholder="Medicine name"
                    className="px-4 py-2 border border-gray-300 rounded-lg"
                    value={newDose.name}
                    onChange={(e) => setNewDose({ ...newDose, name: e.target.value })}
                  />
                  <input
                    type="time"
                    className="px-4 py-2 border border-gray-300 rounded-lg"
                    value={newDose.time}
                    onChange={(e) => setNewDose({ ...newDose, time: e.target.value })}
                  />
                  <div className="flex flex-wrap gap-2">
                    {DAYS.map((day) => (
                      <button
                        key={day}
                        onClick={() => {
                          const days = newDose.days.includes(day)
                            ? newDose.days.filter((d) => d !== day)
                            : [...newDose.days, day];
                          setNewDose({ ...newDose, days });
                        }}
                        className={`px-3 py-1 rounded-full ${
                          newDose.days.includes(day)
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {day.slice(0, 3)}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setShowAddDose(false)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddDose}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {doses.map((dose) => (
                <div
                  key={dose.id}
                  className={`p-4 rounded-lg border ${
                    dose.days.includes(currentDay) ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{dose.name}</h3>
                      <p className="text-sm text-gray-500">{dose.time}</p>
                    </div>
                    <button
                      onClick={() => removeDose(dose.id)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {dose.days.map((day) => (
                      <span
                        key={day}
                        className={`px-2 py-1 text-xs rounded-full ${
                          day === currentDay
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {day.slice(0, 3)}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Nearby Pharmacies</h2>
            <div className="space-y-4">
              {pharmacies.map((pharmacy) => (
                <div key={pharmacy.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">{pharmacy.name}</h3>
                    <span className="text-sm text-gray-500">{pharmacy.distance}km away</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{pharmacy.address}</p>
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Available Medicines</h4>
                    <div className="space-y-2">
                      {pharmacy.medicines.map((medicine, idx) => (
                        <div key={idx} className="flex items-center justify-between text-sm">
                          <span>{medicine.name}</span>
                          <div>
                            <span className="text-gray-900">${medicine.price}</span>
                            {medicine.discount > 0 && (
                              <span className="ml-2 text-green-600">-{medicine.discount}%</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Home;