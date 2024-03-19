
export interface AngularImageViewerPerspective {
  width: number;
  height: number;
  cropSize: number;
}

export type AvailablePerspectivesTypes = 'SMALL' | 'MEDIUM' | 'LARGE';

export const availablePerspectives: { [key: string]: AngularImageViewerPerspective } = {
  ['SMALL']: {
    width: 600,
    height: 300,
    cropSize: 150
  },
  ['MEDIUM']: {
    width: 700,
    height: 500,
    cropSize: 200
  },
  ['LARGE']: {
    width: 800,
    height: 600,
    cropSize: 250
  },
};
