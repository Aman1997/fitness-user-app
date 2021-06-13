import {getDistance} from "geolib";

export type coords = {
  latitude: number;
  longitude: number;
};

export const findDistance = (coords1: coords, coords2: coords) => {
  return getDistance(coords1, coords2)/1000;
};
