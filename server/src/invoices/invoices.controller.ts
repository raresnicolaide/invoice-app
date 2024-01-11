import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  UseGuards,
} from "@nestjs/common";
import { InvoicesService } from "./invoices.service";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { InvoiceEntity } from "./entities/invoice.entity";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("invoices")
@ApiTags("invoices")
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: InvoiceEntity, isArray: true })
  async findAll() {
    const invoices = await this.invoicesService.findAll();
    return invoices.map((invoice) => new InvoiceEntity(invoice));
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: InvoiceEntity })
  async findOne(@Param("id", ParseIntPipe) id: number) {
    const invoice = await this.invoicesService.findOne(id);
    if (!invoice) {
      throw new NotFoundException(`Invoice with ${id} does not exist.`);
    }
    return new InvoiceEntity(invoice);
  }
}
