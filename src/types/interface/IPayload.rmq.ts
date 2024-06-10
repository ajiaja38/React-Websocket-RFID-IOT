import { EDevice } from "../enum/EDevice.enum";

export interface IPayloadRMQ {
  id: string;
  mac?: string;
  type: EDevice;
  imageUrl?: string;
  latitude?: number;
  longitude?: number;
}
