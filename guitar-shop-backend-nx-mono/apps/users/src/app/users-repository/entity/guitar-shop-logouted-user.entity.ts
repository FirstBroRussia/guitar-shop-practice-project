import { GuitarShopLogoutUserDto } from "@guitar-shop/shared-types";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface LogoutUserEntity extends Document { }

@Schema({
  collection: 'logouted_users',
})
export class LogoutUserEntity {
  @Prop({
    required: true,
  })
  public accessToken!: string;

  @Prop({
    required: true,
  })
  public exp!: number;


  public fillObject(dto: GuitarShopLogoutUserDto) {
    const { accessToken, exp } = dto;

    this.accessToken = accessToken;
    this.exp = exp;

    return this;
  }
}

export const LogoutUserSchema = SchemaFactory.createForClass(LogoutUserEntity);

