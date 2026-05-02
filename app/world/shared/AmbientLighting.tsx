export function AmbientLighting() {
  return (
    <>
      {/* Much brighter ambient light so everything is visible */}
      <ambientLight intensity={2} color="#F1F5F9" />

      {/* Brighter directional light for depth */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={2}
        color="#F1F5F9"
      />

      {/* Additional fill light */}
      <directionalLight
        position={[-10, 5, 10]}
        intensity={1}
        color="#3B82F6"
      />
    </>
  );
}
