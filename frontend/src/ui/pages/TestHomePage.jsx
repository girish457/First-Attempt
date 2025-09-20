import React from 'react'

export default function TestHomePage() {
  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-4xl font-bold text-center text-gray-900">
        TEST HOME PAGE - WORKING!
      </h1>
      <p className="text-center text-gray-600 mt-4">
        If you can see this, React is working correctly.
      </p>
      <div className="max-w-4xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-blue-100 p-6 rounded-lg">
          <h3 className="font-bold text-lg">Test Card 1</h3>
          <p>This is a test card to verify styling works.</p>
        </div>
        <div className="bg-green-100 p-6 rounded-lg">
          <h3 className="font-bold text-lg">Test Card 2</h3>
          <p>Another test card with different color.</p>
        </div>
        <div className="bg-purple-100 p-6 rounded-lg">
          <h3 className="font-bold text-lg">Test Card 3</h3>
          <p>Final test card to check grid layout.</p>
        </div>
      </div>
    </div>
  )
}