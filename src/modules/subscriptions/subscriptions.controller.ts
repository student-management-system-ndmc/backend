import { Controller, Get, Post, Body, Param, ParseIntPipe, Patch } from '@nestjs/common'
import { SubscriptionsService } from './subscriptions.service'
import { CreateSubscriptionDto } from '@dto'

@Controller('api/subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post()
  create(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionsService.create(createSubscriptionDto)
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.subscriptionsService.findOne(id)
  }

  @Get()
  findAll() {
    return this.subscriptionsService.findAll()
  }

  @Patch(':id/use')
  useSession(@Param('id', ParseIntPipe) id: number) {
    return this.subscriptionsService.useSession(id)
  }

  @Get('student/:studentId')
  findByStudent(@Param('studentId', ParseIntPipe) studentId: number) {
    return this.subscriptionsService.findByStudent(studentId)
  }

  @Patch(':id/extend')
  extendSubscription(@Param('id', ParseIntPipe) id: number, @Body() extendData: { additional_sessions: number }) {
    return this.subscriptionsService.extendSubscription(id, extendData.additional_sessions)
  }
}
