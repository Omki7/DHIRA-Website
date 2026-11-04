/*
 * SIMULATED PRODUCT UI — not real Akashic app code.
 * The faces of the /akashic [02] teardown plates: one crop of the product
 * per module, drawn at the plate's own size (536 × 376) so it reads in the
 * scene instead of shrinking with a whole app window.
 */

import {
  Ask,
  Dashboard,
  FACE_H,
  FACE_W,
  Forecast,
  MasterData,
  Pipelines,
  Warehouse,
} from "./PlateScreens";
import styles from "./AkashicPlateScreensMockup.module.scss";

export { FACE_W, FACE_H };

const FACES = [Pipelines, MasterData, Warehouse, Forecast, Ask, Dashboard];

export interface AkashicPlateScreensMockupProps {
  index: number;
}

export function AkashicPlateScreensMockup({ index }: AkashicPlateScreensMockupProps) {
  const Screen = FACES[index];
  return (
    <div className={styles.root} aria-hidden="true">
      <Screen />
    </div>
  );
}
