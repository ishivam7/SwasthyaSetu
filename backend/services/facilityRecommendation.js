const Facility = require("../models/Facility");

const recommendFacilities = async (patientLng, patientLat, serviceFilter = null, maxDistanceMeters = 50000) => {
  const pipeline = [
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [parseFloat(patientLng), parseFloat(patientLat)],
        },
        distanceField: "distanceInMeters",
        maxDistance: maxDistanceMeters,
        spherical: true,
      },
    },
  ];

  // Optional filter by required clinical service
  if (serviceFilter) {
    pipeline.push({
      $match: { services: { $in: [serviceFilter] } },
    });
  }

  // Sort by closest distance first, then by highest available bed count
  pipeline.push({
    $sort: { distanceInMeters: 1, availableBeds: -1 },
  });

  const facilities = await Facility.aggregate(pipeline);
  return facilities;
};

module.exports = { recommendFacilities };