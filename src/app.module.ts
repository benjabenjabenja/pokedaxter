import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

// Environment
import { EnvConfig } from './config/env.config.js';
import { JoiValidationEnvSchema } from './config/joiValidationEnv.schema.js';
// Modules
import { PokemonModule } from './pokemon/pokemon.module.js';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module.js';
import { SeedModule } from './seed/seed.module.js';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [EnvConfig],
			//validationSchema: JoiValidationEnvSchema
		}),
		ServeStaticModule.forRoot({
			rootPath: join(import.meta.dirname, '..', 'public')
		}),
		MongooseModule.forRoot(
			`${process.env.MONGO_DB}`
		),
		PokemonModule,
		CommonModule,
		SeedModule
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
