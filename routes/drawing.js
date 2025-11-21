import express from 'express';
import generateRef from '../utils/reference.js'; // Make sure reference.js uses ES exports

const router = express.Router();

router.post('/generate', async (req, res) => {
  try {
    const {
      userName,
      plotLength,
      plotBreadth,
      floors,
      buildingType,
      roadFacing,
      doorFacing,
      bedrooms,
      kitchens,
      toilets,
      parking,
      lift,
      staircase
    } = req.body;

    const referenceIds = [];
    const drawingPlans = [];

    for (let i = 0; i < parseInt(floors); i++) {
      const floorCode = i === 0 ? 'GF' : i === 1 ? 'FF' : `F${i}`;
      const refId = generateRef(userName, floorCode, i + 1);
      referenceIds.push(refId);

      const areas = [];

      for (let b = 0; b < parseInt(bedrooms); b++) {
        areas.push({ name: `Bedroom ${b + 1}`, size: { length: 12, breadth: 10 }, LxB: '12x10' });
      }
      for (let k = 0; k < parseInt(kitchens); k++) {
        areas.push({ name: `Kitchen ${k + 1}`, size: { length: 8, breadth: 6 }, LxB: '8x6' });
      }
      for (let t = 0; t < parseInt(toilets); t++) {
        areas.push({ name: `Toilet ${t + 1}`, size: { length: 6, breadth: 4 }, LxB: '6x4' });
      }

      areas.push({ name: 'Living', size: { length: 14, breadth: 12 }, LxB: '14x12' });
      areas.push({ name: 'Balcony', size: { length: 6, breadth: 3 }, LxB: '6x3' });

      if (parking === 'Full') {
        areas.push({ name: 'Parking', size: { length: plotLength, breadth: plotBreadth }, LxB: `${plotLength}x${plotBreadth}` });
      } else if (parking === 'Half') {
        areas.push({ name: 'Parking', size: { length: plotLength, breadth: plotBreadth / 2 }, LxB: `${plotLength}x${plotBreadth / 2}` });
      }

      drawingPlans.push({
        referenceId: refId,
        floor: floorCode,
        areas,
        staircase,
        lift
      });
    }

    res.json({ referenceIds, drawingPlans });
  } catch (err) {
    console.error('Drawing generation failed:', err);
    res.status(500).json({ error: 'Drawing generation failed' });
  }
});

export default router;
