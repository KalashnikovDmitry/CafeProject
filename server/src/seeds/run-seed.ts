import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { seedDatabase } from './seed';

async function runSeed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  try {
    await seedDatabase();
    console.log('✅ Сиды успешно выполнены!');
  } catch (error) {
    console.error('❌ Ошибка при выполнении сидов:', error);
  } finally {
    await app.close();
  }
}

runSeed();
