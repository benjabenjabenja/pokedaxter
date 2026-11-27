import { Controller, Get, Param } from '@nestjs/common';
import { SeedService } from './seed.service.js';

@Controller('seed')
export class SeedController {
	constructor(private readonly seedService: SeedService) {}

	@Get()
	async createSeed(
		@Param('limit') limit: string
	) {
		await this.seedService.createSeed(limit ? +limit : undefined);
		return 'Seed created successfully'
	}

}
