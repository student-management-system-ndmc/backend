import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Subscription } from '@entities'
import { CreateSubscriptionDto } from '@dto'

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,
  ) {}

  async create(createSubscriptionDto: CreateSubscriptionDto): Promise<Subscription> {
    const subscription = this.subscriptionRepository.create({
      ...createSubscriptionDto,
      start_date: new Date(createSubscriptionDto.start_date),
      end_date: new Date(createSubscriptionDto.end_date),
      used_sessions: 0,
    })
    return this.subscriptionRepository.save(subscription)
  }

  async findOne(id: number): Promise<Subscription> {
    return this.subscriptionRepository.findOne({
      where: { id },
      relations: ['student'],
    })
  }

  async findAll(): Promise<Subscription[]> {
    return this.subscriptionRepository.find({
      relations: ['student'],
    })
  }

  async useSession(id: number): Promise<Subscription> {
    const subscription = await this.findOne(id)
    if (!subscription) {
      throw new BadRequestException('Subscription not found')
    }

    if (subscription.used_sessions >= subscription.total_sessions) {
      throw new BadRequestException('No sessions remaining')
    }

    // Check if subscription is still active
    const now = new Date()
    if (now > subscription.end_date) {
      throw new BadRequestException('Subscription has expired')
    }

    subscription.used_sessions += 1
    return this.subscriptionRepository.save(subscription)
  }

  async findByStudent(studentId: number): Promise<Subscription[]> {
    return this.subscriptionRepository.find({
      where: { student_id: studentId },
      relations: ['student'],
    })
  }
  async extendSubscription(id: number, additionalSessions: number): Promise<Subscription> {
    const subscription = await this.findOne(id)
    if (!subscription) {
      throw new BadRequestException('Subscription not found')
    }
    subscription.total_sessions += additionalSessions
    return this.subscriptionRepository.save(subscription)
  }
}
