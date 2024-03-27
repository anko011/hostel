import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAllBookingQuery } from '@/bookings/application/queries';
import { GetBookingByIdQuery } from '@/bookings/application/queries/get-booking-by-id.query';
import {
  BookingResponse,
  CreateBookingRequest,
  UpdateBookingRequest,
} from '@/bookings/presentation/http/dto';
import {
  CreateBookingCommand,
  DeleteBookingCommand,
  UpdateBookingCommand,
} from '@/bookings/application/commands';
import { Public } from '@/auth/presentation/http/decorators';
import { Booking } from '@/bookings/application/entities';
import { Roles } from '@/roles/presentation/http/decorators';
import { Role } from '@/roles/application/entities/role';

@Public()
@Controller('bookings')
export class BookingController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Public()
  @Get()
  async findAll() {
    try {
      const datas: Booking[] = await this.queryBus.execute(
        new GetAllBookingQuery(),
      );
      return datas.map((data) => new BookingResponse(data));
    } catch (e) {
      throw e;
    }
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const data = await this.queryBus.execute(new GetBookingByIdQuery(id));
      if (!data) return null;
      return new BookingResponse(data);
    } catch (e) {
      throw e;
    }
  }

  // @Roles(Role.MANAGER, Role.ADMIN)
  @Post()
  async create(@Body() createBookingDto: CreateBookingRequest) {
    try {
      const data = await this.commandBus.execute(
        new CreateBookingCommand(
          createBookingDto.title,
          createBookingDto.description,
          createBookingDto.roomCount,
          createBookingDto.pricePerDay,
        ),
      );
      return new BookingResponse(data);
    } catch (e) {
      throw e;
    }
  }

  // @Roles(Role.MANAGER, Role.ADMIN)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBookingDto: UpdateBookingRequest,
  ) {
    try {
      const data = await this.commandBus.execute(
        new UpdateBookingCommand(
          id,
          updateBookingDto.title,
          updateBookingDto.description,
          updateBookingDto.roomCount,
          updateBookingDto.pricePerDay,
        ),
      );
      return new BookingResponse(data);
    } catch (e) {
      throw e;
    }
  }

  @Roles(Role.MANAGER, Role.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.commandBus.execute(new DeleteBookingCommand(id));
    } catch (e) {
      throw e;
    }
  }
}
