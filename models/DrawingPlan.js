{
  referenceId: String, // e.g., XYZ-GF-001
  floor: String, // GF, FF, SF...
  areas: [
    {
      name: String, // Bedroom, Kitchen, etc.
      size: { length: Number, breadth: Number }, // in ft
      LxB: String // "12x10"
    }
  ],
  staircase: String,
  lift: Boolean,
  drawingImage: String, // optional base64 or URL
  createdAt: Date
}
