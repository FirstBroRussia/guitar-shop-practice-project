import { ModalNameEnum } from '../enum/modal-name.enum';

export type ModalNameType = typeof ModalNameEnum[keyof typeof ModalNameEnum];
