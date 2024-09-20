import { Orientation, SphereData } from '../types/map';

interface SphereDataRelative {
  sphereData: SphereData;
  distance: number;
  orientation: Orientation;
}

export const getSphereDataRelative = (
  targetSphere: SphereData,
  selectedSphere: SphereData
): SphereDataRelative => {
  const dx = targetSphere.position.x - selectedSphere.position.x;
  const dy = targetSphere.position.y - selectedSphere.position.y;
  const distance = Math.sqrt(dx ** 2 + dy ** 2);
  const orientation: Orientation = {
    yaw: Math.atan2(dx, -dy) * (180 / Math.PI),
    pitch: 0.0 * (180 / Math.PI),
  };
  return { sphereData: targetSphere, distance, orientation };
};

export const getNearestSpheres = (
  spheres: SphereData[],
  selectedSphere: SphereData,
  radius: number = 1000
): SphereDataRelative[] => {
  // selectedSphereからの距離と方向を計算
  const sphereDataRelatives: SphereDataRelative[] = spheres.map(
    (sphereData) => {
      return getSphereDataRelative(sphereData, selectedSphere);
    }
  );

  // distanceに応じてソート
  sphereDataRelatives.sort((a, b) => a.distance - b.distance);

  // radius以内のSphereを取得
  var nearestSpheres: SphereDataRelative[] = [];
  for (const sphereDataRelative of sphereDataRelatives) {
    if (
      sphereDataRelative.distance <= radius &&
      sphereDataRelative.sphereData !== selectedSphere &&
      sphereDataRelative.sphereData.layerId === selectedSphere.layerId
    ) {
      nearestSpheres.push(sphereDataRelative);
    }
  }

  // yaw, pitchで5度以内のsphereは除外
  var filteredSpheres: SphereDataRelative[] = [];
  for (const sphereDataRelative of nearestSpheres) {
    var isNear = false;
    for (const filteredSphere of filteredSpheres) {
      const dy =
        sphereDataRelative.orientation.yaw - filteredSphere.orientation.yaw;
      const dp =
        sphereDataRelative.orientation.pitch - filteredSphere.orientation.pitch;
      const criterionDegrees = 5;
      if (dy < criterionDegrees || dp < criterionDegrees) {
        isNear = true;
        break;
      }
    }
    if (!isNear) {
      filteredSpheres.push(sphereDataRelative);
    }
  }

  return filteredSpheres;
};
