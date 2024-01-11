import { ApiProperty } from "@nestjs/swagger";
import { User } from "@prisma/client";

export class AuthEntity {
  @ApiProperty()
  token: string;
  user: Partial<User>;
}
